import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MOUSE, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const initialAngles = {
  hipYaw: 0,
  hipRoll: 0,
  hipPitch: 0,
  knee: 0,
  anklePitch: 0,
  ankleRoll: 0,
}

const joints = [
  { key: 'hipYaw', label: 'Hip yaw · Y axis', min: -45, max: 45 },
  { key: 'hipRoll', label: 'Hip roll · X axis', min: -30, max: 30 },
  { key: 'hipPitch', label: 'Hip pitch · Z axis', min: -60, max: 60 },
  { key: 'knee', label: 'Knee flexion · Z axis', min: -10, max: 120 },
  { key: 'anklePitch', label: 'Ankle pitch · Z axis', min: -45, max: 45 },
  { key: 'ankleRoll', label: 'Ankle roll · X axis', min: -25, max: 25 },
]

// This illustrative rig uses Y-up coordinates. Hip rotations are applied Y → X → Z
// (yaw → roll → pitch), followed by knee Z flexion, then ankle Z pitch → X roll.
// The axes and arbitrary model proportions are design choices, not report/CAD data.
const radians = (degrees) => (degrees * Math.PI) / 180

function AxisGuides() {
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.003, 0.003, 0.28, 6]} />
        <meshBasicMaterial color="#cc766e" />
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.003, 0.003, 0.28, 6]} />
        <meshBasicMaterial color="#6db58f" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.003, 0.003, 0.28, 6]} />
        <meshBasicMaterial color="#729acb" />
      </mesh>
    </group>
  )
}

function JointCenter({ radius = 0.105 }) {
  return (
    <>
      <mesh castShadow>
        <sphereGeometry args={[radius, 20, 14]} />
        <meshStandardMaterial color="#aeb8b2" metalness={0.72} roughness={0.32} />
      </mesh>
      <AxisGuides />
    </>
  )
}

function Link({ length, topRadius, bottomRadius, color }) {
  return (
    <mesh position={[0, -length / 2, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[topRadius, bottomRadius, length, 20, 1]} />
      <meshStandardMaterial color={color} metalness={0.58} roughness={0.36} />
    </mesh>
  )
}

function LegRig({ angles }) {
  const hipYaw = radians(angles.hipYaw)
  const hipRoll = radians(angles.hipRoll)
  const hipPitch = radians(angles.hipPitch)
  const knee = radians(angles.knee)
  const anklePitch = radians(angles.anklePitch)
  const ankleRoll = radians(angles.ankleRoll)
  const thighLength = 1.42
  const shankLength = 1.34

  return (
    <group position={[0, 0.8, 0]} rotation={[0, hipYaw, 0]}>
      <group rotation={[hipRoll, 0, 0]}>
        <group rotation={[0, 0, hipPitch]}>
          <JointCenter radius={0.14} />
          <Link length={thighLength} topRadius={0.17} bottomRadius={0.105} color="#718078" />
          <group position={[0, -thighLength, 0]} rotation={[0, 0, knee]}>
            <JointCenter radius={0.12} />
            <Link length={shankLength} topRadius={0.12} bottomRadius={0.075} color="#929d96" />
            <group position={[0, -shankLength, 0]} rotation={[0, 0, anklePitch]}>
              <group rotation={[ankleRoll, 0, 0]}>
                <JointCenter radius={0.09} />
                <mesh position={[0, -0.075, 0.2]} castShadow receiveShadow>
                  <boxGeometry args={[0.32, 0.15, 0.68]} />
                  <meshStandardMaterial color="#69766e" metalness={0.52} roughness={0.4} />
                </mesh>
                <mesh position={[0, -0.15, 0.2]} castShadow>
                  <boxGeometry args={[0.34, 0.035, 0.7]} />
                  <meshStandardMaterial color="#aeb8b2" metalness={0.65} roughness={0.34} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

function LegViewControls({ cameraResetRef }) {
  const { camera, gl } = useThree()
  const controlsRef = useRef(null)

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement)
    controlsRef.current = controls
    const target = new Vector3(0, -0.12, 0)
    const resetCamera = () => {
      controls.target.copy(target)
      camera.position.set(3.1, 1.7, 4.2)
      camera.up.set(0, 1, 0)
      camera.lookAt(target)
      camera.updateProjectionMatrix()
      controls.update()
    }

    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.enablePan = true
    controls.rotateSpeed = 0.55
    controls.zoomSpeed = 0.7
    controls.panSpeed = 0.55
    controls.minDistance = 2.2
    controls.maxDistance = 8
    controls.minPolarAngle = 0.12
    controls.maxPolarAngle = Math.PI * 0.92
    controls.mouseButtons.LEFT = MOUSE.ROTATE
    controls.mouseButtons.MIDDLE = MOUSE.DOLLY
    controls.mouseButtons.RIGHT = MOUSE.PAN
    resetCamera()
    cameraResetRef.current = resetCamera

    const preventContextMenu = (event) => event.preventDefault()
    gl.domElement.addEventListener('contextmenu', preventContextMenu)
    return () => {
      gl.domElement.removeEventListener('contextmenu', preventContextMenu)
      controls.dispose()
      controlsRef.current = null
      cameraResetRef.current = null
    }
  }, [camera, cameraResetRef, gl])

  useFrame(() => controlsRef.current?.update())
  return null
}

function AngleControl({ joint, value, onChange }) {
  const id = `robotic-leg-${joint.key}`
  return (
    <div className="robotic-leg__control">
      <div className="robotic-leg__control-heading">
        <label htmlFor={id}>{joint.label}</label>
        <output htmlFor={id}>{value}°</output>
      </div>
      <input
        id={id}
        type="range"
        min={joint.min}
        max={joint.max}
        step="1"
        value={value}
        aria-valuetext={`${value} degrees`}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className="robotic-leg__limits" aria-hidden="true"><span>{joint.min}°</span><span>{joint.max}°</span></div>
    </div>
  )
}

function RoboticLegVisualization() {
  const [angles, setAngles] = useState(initialAngles)
  const cameraResetRef = useRef(null)

  const updateJoint = (key, value) => {
    setAngles((current) => ({ ...current, [key]: value }))
  }

  return (
    <div className="robotic-leg" aria-label="Illustrative interactive six-degree-of-freedom robotic leg model">
      <style>{`
        .robotic-leg { min-width: 0; color: var(--text); }
        .robotic-leg__stage { position: relative; min-height: 300px; height: clamp(300px, 48vw, 440px); overflow: hidden; border: 1px solid var(--border); border-radius: 7px; background: var(--surface); }
        .robotic-leg__stage > div { width: 100% !important; height: 100% !important; }
        .robotic-leg__stage canvas { display: block; width: 100%; height: 100%; touch-action: none; }
        .robotic-leg__hint { position: absolute; bottom: 0.65rem; left: 0.75rem; margin: 0; color: var(--dim); font-family: var(--mono); font-size: 0.58rem; letter-spacing: 0.05em; pointer-events: none; }
        .robotic-leg__disclaimer { position: absolute; top: 0.75rem; left: 0.8rem; margin: 0; padding: 0.3rem 0.45rem; border: 1px solid var(--border); border-radius: 3px; background: color-mix(in srgb, var(--bg) 88%, transparent); color: var(--muted); font-family: var(--mono); font-size: 0.54rem; letter-spacing: 0.055em; line-height: 1.4; }
        .robotic-leg__camera-reset { position: absolute; top: 0.65rem; right: 0.7rem; z-index: 1; padding: 0.42rem 0.6rem; border: 1px solid var(--border); border-radius: 5px; background: var(--bg); color: var(--muted); font: inherit; font-size: 0.68rem; cursor: pointer; }
        .robotic-leg__camera-reset:hover { border-color: var(--border-strong); color: var(--accent); }
        .robotic-leg__camera-reset:focus-visible, .robotic-leg__control input:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
        .robotic-leg__controls { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.8rem 1.1rem; padding: 1rem 0.1rem 0; }
        .robotic-leg__control { min-width: 0; }
        .robotic-leg__control-heading, .robotic-leg__limits { display: flex; align-items: baseline; justify-content: space-between; gap: 0.5rem; }
        .robotic-leg__control-heading label { color: var(--muted); font-size: 0.76rem; }
        .robotic-leg__control-heading output { color: var(--text); font-family: var(--mono); font-size: 0.7rem; }
        .robotic-leg__control input { display: block; width: 100%; height: 18px; margin: 0.35rem 0 0; accent-color: var(--accent); cursor: pointer; }
        .robotic-leg__limits { color: var(--dim); font-family: var(--mono); font-size: 0.58rem; }
        @media (max-width: 540px) {
          .robotic-leg__stage { min-height: 270px; height: 78vw; max-height: 360px; }
          .robotic-leg__controls { grid-template-columns: minmax(0, 1fr); gap: 0.75rem; }
          .robotic-leg__disclaimer { right: 0.65rem; max-width: calc(100% - 1.3rem); font-size: 0.46rem; }
          .robotic-leg__hint { font-size: 0.5rem; }
        }
      `}</style>

      <div className="robotic-leg__stage" onContextMenu={(event) => event.preventDefault()}>
        <Canvas
          aria-label="Illustrative 3D robotic leg. Drag to orbit and scroll to zoom."
          camera={{ fov: 38, near: 0.1, far: 30, position: [3.1, 1.7, 4.2] }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={1.25} />
          <directionalLight position={[3, 5, 4]} intensity={2.1} />
          <directionalLight position={[-3, 1, -2]} intensity={0.75} />
          <LegRig angles={angles} />
          <LegViewControls cameraResetRef={cameraResetRef} />
        </Canvas>
        <button className="robotic-leg__camera-reset" type="button" onClick={() => cameraResetRef.current?.()}>
          Reset camera
        </button>
        <p className="robotic-leg__disclaimer">ILLUSTRATIVE KINEMATIC MODEL · NOT ORIGINAL CAD OR SIMULATION RESULTS</p>
        <p className="robotic-leg__hint">DRAG TO ORBIT · SCROLL TO ZOOM · RIGHT CLICK TO PAN</p>
      </div>

      <div className="robotic-leg__controls" aria-label="Joint angle controls">
        {joints.map((joint) => (
          <AngleControl
            key={joint.key}
            joint={joint}
            value={angles[joint.key]}
            onChange={(value) => updateJoint(joint.key, value)}
          />
        ))}
      </div>
    </div>
  )
}

export default RoboticLegVisualization
