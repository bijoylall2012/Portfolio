import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { BufferGeometry, Color, DoubleSide, Float32BufferAttribute, MOUSE, SRGBColorSpace, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { BEAM, BEAM_CONTROL_LIMITS, BEAM_STRESS_SCALE_MAX_MPA, getStressScalePosition, solveCantilever } from '../lib/beamSolver.js'
import { BEAM_VIEW, getRequiredBeamCameraDistance } from '../lib/beamView.js'

const initial = { lengthCm: 30, forceN: 2000 }
const stressColors = ['#2463eb', '#06b6d4', '#2bb36c', '#e7cc42', '#f08a32', '#e4524b']
  .map((hex) => new Color(hex).getRGB({ r: 0, g: 0, b: 0 }, SRGBColorSpace))

function rectangularPerimeter(width, height, divisions = 6) {
  const points = []
  const corners = [
    [-width / 2, -height / 2], [width / 2, -height / 2],
    [width / 2, height / 2], [-width / 2, height / 2],
  ]
  corners.forEach((start, index) => {
    const end = corners[(index + 1) % corners.length]
    for (let step = 0; step < divisions; step += 1) {
      const t = step / divisions
      points.push([start[0] + (end[0] - start[0]) * t, start[1] + (end[1] - start[1]) * t])
    }
  })
  return points
}

function createBeamGeometry(solution) {
  const { lengthM, inertiaM4, sampleAt, displayScale } = solution
  const { widthM, heightM, elasticModulusPa } = BEAM
  const perimeter = rectangularPerimeter(widthM, heightM)
  const divisionsPerElement = 6
  const ringCount = BEAM.elementCount * divisionsPerElement + 1
  const positions = []
  const colors = []
  const indices = []
  const color = new Color()

  for (let ring = 0; ring < ringCount; ring += 1) {
    const x = lengthM * ring / (ringCount - 1)
    const { displacementM, curvaturePerM } = sampleAt(x)
    const bendingMomentNm = elasticModulusPa * inertiaM4 * curvaturePerM
    for (const [y, z] of perimeter) {
      const localStressMPa = Math.abs(bendingMomentNm * z / inertiaM4) / 1e6
      const rampPosition = getStressScalePosition(localStressMPa, BEAM_STRESS_SCALE_MAX_MPA) * (stressColors.length - 1)
      const lowerStop = Math.min(stressColors.length - 2, Math.floor(rampPosition))
      const interpolation = rampPosition - lowerStop
      const from = stressColors[lowerStop]
      const to = stressColors[lowerStop + 1]
      color.setRGB(
        from.r + (to.r - from.r) * interpolation,
        from.g + (to.g - from.g) * interpolation,
        from.b + (to.b - from.b) * interpolation,
        SRGBColorSpace,
      )
      positions.push(
        x * BEAM_VIEW.visualScale,
        y * BEAM_VIEW.visualScale,
        (z + displacementM * displayScale) * BEAM_VIEW.visualScale,
      )
      colors.push(color.r, color.g, color.b)
    }
  }

  for (let ring = 0; ring < ringCount - 1; ring += 1) {
    for (let edge = 0; edge < perimeter.length; edge += 1) {
      const next = (edge + 1) % perimeter.length
      const a = ring * perimeter.length + edge
      const b = ring * perimeter.length + next
      const c = (ring + 1) * perimeter.length + next
      const d = (ring + 1) * perimeter.length + edge
      indices.push(a, b, d, b, c, d)
    }
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

function BeamMesh({ solution }) {
  const geometry = useMemo(() => createBeamGeometry(solution), [solution])
  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial vertexColors roughness={0.42} metalness={0.34} side={DoubleSide} />
    </mesh>
  )
}

function LoadArrow({ lengthM, tipDisplacementM }) {
  const shaftLength = 0.055
  return (
    <group
      scale={BEAM_VIEW.visualScale}
      position={[lengthM * BEAM_VIEW.visualScale, 0, (BEAM.heightM / 2 + tipDisplacementM + 0.068) * BEAM_VIEW.visualScale]}
    >
      <mesh position={[0, 0, -shaftLength / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.0018, 0.0018, shaftLength, 10]} />
        <meshStandardMaterial color="#d5e4dc" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0, -shaftLength - 0.006]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.006, 0.012, 12]} />
        <meshStandardMaterial color="#d5e4dc" roughness={0.55} />
      </mesh>
    </group>
  )
}

function Support({ lengthM }) {
  return (
    <group scale={BEAM_VIEW.visualScale} position={[BEAM_VIEW.supportOffsetM * BEAM_VIEW.visualScale, 0, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.018, 0.078, 0.105]} />
        <meshStandardMaterial color="#526057" roughness={0.76} />
      </mesh>
      {Array.from({ length: 6 }, (_, index) => (
        <mesh key={index} position={[-0.002, -0.032 + index * 0.013, -0.046]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.002, 0.004, 0.008]} />
          <meshStandardMaterial color="#849087" roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[lengthM / 2, 0, BEAM_VIEW.floorCenterZM]} receiveShadow>
        <boxGeometry args={[lengthM + BEAM_VIEW.floorLengthMarginM, BEAM_VIEW.floorWidthM, BEAM_VIEW.floorThicknessM]} />
        <meshStandardMaterial color="#18211c" roughness={0.9} />
      </mesh>
    </group>
  )
}

function ViewControls({ lengthMm, resetViewRef }) {
  const { camera, gl, size } = useThree()
  const controlsRef = useRef(null)
  const lengthMmRef = useRef(lengthMm)
  const manualViewRef = useRef(false)
  const desiredDistanceRef = useRef(BEAM_VIEW.preferredDistance)
  const animateDistanceRef = useRef(false)
  lengthMmRef.current = lengthMm

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement)
    controlsRef.current = controls
    const initialTarget = new Vector3(...BEAM_VIEW.target)
    camera.up.set(0, 0, 1)
    controls.target.copy(initialTarget)
    camera.position.copy(initialTarget).addScaledVector(new Vector3(...BEAM_VIEW.cameraDirection).normalize(), BEAM_VIEW.preferredDistance)
    camera.lookAt(initialTarget)
    camera.updateProjectionMatrix()
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.rotateSpeed = 0.45
    controls.panSpeed = 0.32
    controls.zoomSpeed = 0.55
    controls.enablePan = true
    controls.mouseButtons.LEFT = MOUSE.ROTATE
    controls.mouseButtons.MIDDLE = MOUSE.DOLLY
    controls.mouseButtons.RIGHT = MOUSE.PAN
    controls.screenSpacePanning = true
    controls.minPolarAngle = 0.2
    controls.maxPolarAngle = Math.PI * 0.48
    controls.minDistance = 0.24
    controls.maxDistance = 1.8
    controls.update()
    controls.saveState()
    const resetView = (lengthMmToFrame = lengthMmRef.current) => {
      manualViewRef.current = false
      animateDistanceRef.current = false
      controls.reset()

      const target = new Vector3(...BEAM_VIEW.target)
      const direction = new Vector3(...BEAM_VIEW.cameraDirection).normalize()
      camera.up.set(0, 0, 1)
      controls.target.copy(target)
      camera.position.copy(target).addScaledVector(direction, BEAM_VIEW.preferredDistance)
      camera.lookAt(target)
      camera.updateProjectionMatrix()
      camera.updateMatrixWorld(true)

      const requiredDistance = getRequiredBeamCameraDistance(camera, target, lengthMmToFrame)
      const resetDistance = Math.max(BEAM_VIEW.preferredDistance, requiredDistance)
      camera.position.copy(target).addScaledVector(direction, resetDistance)
      camera.lookAt(target)
      desiredDistanceRef.current = resetDistance
      controls.update()
    }
    resetViewRef.current = resetView
    const stopAutomaticMovement = () => {
      manualViewRef.current = true
      animateDistanceRef.current = false
    }
    const preventContextMenu = (event) => event.preventDefault()
    controls.addEventListener('start', stopAutomaticMovement)
    gl.domElement.addEventListener('wheel', stopAutomaticMovement, { capture: true, passive: true })
    gl.domElement.addEventListener('contextmenu', preventContextMenu)
    return () => {
      controls.removeEventListener('start', stopAutomaticMovement)
      gl.domElement.removeEventListener('wheel', stopAutomaticMovement, true)
      gl.domElement.removeEventListener('contextmenu', preventContextMenu)
      controls.dispose()
      controlsRef.current = null
      if (resetViewRef.current === resetView) resetViewRef.current = null
    }
  }, [camera, gl, resetViewRef])

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return
    camera.updateMatrixWorld(true)
    const requiredDistance = getRequiredBeamCameraDistance(camera, controls.target, lengthMm)
    const currentDistance = camera.position.distanceTo(controls.target)
    const desiredDistance = manualViewRef.current
      ? Math.max(currentDistance, requiredDistance)
      : Math.max(BEAM_VIEW.preferredDistance, requiredDistance)
    desiredDistanceRef.current = desiredDistance
    animateDistanceRef.current = Math.abs(desiredDistance - currentDistance) > 0.001
  }, [camera, lengthMm, size.width, size.height])

  useFrame((_, delta) => {
    const controls = controlsRef.current
    if (!controls) return
    if (animateDistanceRef.current) {
      const offset = camera.position.clone().sub(controls.target)
      const currentDistance = offset.length()
      const desiredDistance = desiredDistanceRef.current
      const nextDistance = currentDistance + (desiredDistance - currentDistance) * (1 - Math.exp(-5 * delta))
      if (Math.abs(desiredDistance - nextDistance) < 0.001) {
        animateDistanceRef.current = false
        camera.position.copy(controls.target).addScaledVector(offset.normalize(), desiredDistance)
      } else {
        camera.position.copy(controls.target).addScaledVector(offset.normalize(), nextDistance)
      }
    }
    controls.update()
  })
  return null
}

function BeamScene({ solution, resetViewRef }) {
  return (
    <>
      <ambientLight intensity={1.45} />
      <directionalLight position={[0.18, -0.28, 0.5]} intensity={2.2} />
      <directionalLight position={[-0.3, 0.2, 0.2]} intensity={0.6} />
      <BeamMesh solution={solution} />
      <Support lengthM={solution.lengthM} />
      <LoadArrow lengthM={solution.lengthM} tipDisplacementM={solution.sampleAt(solution.lengthM).displacementM * solution.displayScale} />
      <ViewControls lengthMm={solution.lengthM * 1000} resetViewRef={resetViewRef} />
    </>
  )
}

function RangeControl({ id, label, value, min, max, step, unit, onChange }) {
  return (
    <div className="beam-control">
      <div className="beam-control__heading">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{value.toLocaleString('en-US')} <span>{unit}</span></output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <div className="beam-control__limits" aria-hidden="true"><span>{min} {unit}</span><span>{max} {unit}</span></div>
    </div>
  )
}

function BeamSimulation() {
  const [parameters, setParameters] = useState(initial)
  const resetViewRef = useRef(null)
  const lengthMm = parameters.lengthCm * 10
  const solution = useMemo(() => solveCantilever({ lengthMm, forceN: parameters.forceN }), [lengthMm, parameters.forceN])
  const resetBeam = () => {
    setParameters(initial)
    resetViewRef.current?.(initial.lengthCm * 10)
  }

  return (
    <div className="beam-simulation" aria-label="Interactive cantilever beam simulation">
      <div className="beam-viewport" onContextMenu={(event) => event.preventDefault()}>
        <Canvas
          aria-label="Three dimensional cantilever beam. Drag to orbit and scroll to zoom."
          camera={{ fov: BEAM_VIEW.fieldOfViewDegrees, near: BEAM_VIEW.near, far: BEAM_VIEW.far, position: BEAM_VIEW.cameraPosition, up: [0, 0, 1] }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <BeamScene solution={solution} resetViewRef={resetViewRef} />
        </Canvas>
        <span className="beam-orbit-hint">DRAG TO ORBIT · SCROLL TO ZOOM · RIGHT CLICK TO PAN</span>
        <button className="beam-reset-view" type="button" onClick={resetBeam} aria-label="Reset beam simulation to its initial state">Reset</button>
      </div>
      <div className="beam-legend" aria-label={`Nominal von Mises stress scale from 0 to ${BEAM_STRESS_SCALE_MAX_MPA.toFixed(0)} megapascals`}>
        <span>VON MISES · NOMINAL</span>
        <span>0 MPa</span>
        <span className="beam-legend__bar" aria-hidden="true" />
        <strong>240 MPa</strong>
      </div>
      <div className="beam-controls">
        <RangeControl id="beam-length" label="Beam Length" value={parameters.lengthCm} min={BEAM_CONTROL_LIMITS.lengthMm.min / 10} max={BEAM_CONTROL_LIMITS.lengthMm.max / 10} step={1} unit="cm" onChange={(lengthCm) => setParameters((current) => ({ ...current, lengthCm }))} />
        <RangeControl id="beam-force" label="Load" value={parameters.forceN} min={BEAM_CONTROL_LIMITS.forceN.min} max={BEAM_CONTROL_LIMITS.forceN.max} step={50} unit="N" onChange={(forceN) => setParameters((current) => ({ ...current, forceN }))} />
      </div>
      <div className="beam-results" aria-live="polite">
        <div><span>MAX VON MISES STRESS</span><output>{solution.maxVonMisesMPa.toFixed(1)} <small>MPa</small></output></div>
        <div><span>FREE-END DEFLECTION</span><output>{solution.tipDeflectionMm.toFixed(2)} <small>mm</small></output></div>
      </div>
    </div>
  )
}

export default BeamSimulation
