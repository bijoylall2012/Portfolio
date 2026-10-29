import { BEAM, BEAM_STRESS_SCALE_MAX_MPA, getStressScalePosition, solveCantilever, validateCantilever } from '../src/lib/beamSolver.js'
import { BEAM_VIEW, getBeamRenderBounds, getRequiredBeamCameraDistance } from '../src/lib/beamView.js'
import { PerspectiveCamera, Vector3 } from 'three'

const cases = [
  { lengthMm: 200, forceN: 100 },
  { lengthMm: 200, forceN: 2000 },
  { lengthMm: 500, forceN: 100 },
  { lengthMm: 500, forceN: 2000 },
  { lengthMm: 380, forceN: 2000 },
  { lengthMm: 300, forceN: 1500 },
]

let hasFailed = false
function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL ${message}`)
    hasFailed = true
  }
}

for (const parameters of cases) {
  const result = validateCantilever(parameters)
  console.log(
    `${result.passed ? 'PASS' : 'FAIL'} L=${(parameters.lengthMm / 10).toFixed(0)} cm, F=${parameters.forceN} N` +
    ` · tip=${result.numerical.tipDeflectionMm.toFixed(6)} mm` +
    ` · max stress=${result.numerical.maxVonMisesMPa.toFixed(3)} MPa` +
    ` · errors=${(result.deflectionRelativeError * 100).toExponential(2)}%, ${(result.stressRelativeError * 100).toExponential(2)}%`,
  )
  hasFailed ||= !result.passed
  assert(result.numerical.maxVonMisesMPa <= BEAM_STRESS_SCALE_MAX_MPA + 1e-8, 'stress result remains within the shared legend scale')
}

const shortest = solveCantilever({ lengthMm: 200, forceN: 2000 })
const longest = solveCantilever({ lengthMm: 500, forceN: 2000 })
const forceLow = solveCantilever({ lengthMm: 500, forceN: 1000 })
const lengthHalf = solveCantilever({ lengthMm: 250, forceN: 2000 })
const curvatureAtRoot = shortest.sampleAt(0).curvaturePerM
const rootSurfaceStress = BEAM.elasticModulusPa * Math.abs(curvatureAtRoot) * BEAM.heightM / 2 / 1e6

assert(shortest.nodes[0].displacementM === 0, 'fixed-end displacement is zero')
assert(shortest.nodes.at(-1).displacementM < 0, 'downward force produces downward deflection')
assert(shortest.nodes.every((node, index, nodes) => index === 0 || Math.abs(node.displacementM) >= Math.abs(nodes[index - 1].displacementM)), 'deflection magnitude increases toward the free end')
assert(Math.abs(rootSurfaceStress - shortest.maxVonMisesMPa) / shortest.maxVonMisesMPa < 1e-8, 'root outer-fibre stress is the maximum stress')
assert(Math.abs(longest.tipDeflectionMm / forceLow.tipDeflectionMm - 2) < 1e-8, 'deflection scales linearly with force')
assert(Math.abs(longest.tipDeflectionMm / lengthHalf.tipDeflectionMm - 8) < 1e-8, 'deflection scales with the cube of length')
assert(Math.abs(longest.maxVonMisesMPa / forceLow.maxVonMisesMPa - 2) < 1e-8, 'stress scales linearly with force')
assert(Math.abs(longest.maxVonMisesMPa / lengthHalf.maxVonMisesMPa - 2) < 1e-8, 'stress scales linearly with length')
assert(getStressScalePosition(100, BEAM_STRESS_SCALE_MAX_MPA) !== getStressScalePosition(200, BEAM_STRESS_SCALE_MAX_MPA), 'the displayed color position responds to a changed stress field')
assert(getStressScalePosition(BEAM_STRESS_SCALE_MAX_MPA * 1.1, BEAM_STRESS_SCALE_MAX_MPA) === 1, 'over-scale stress clamps to the red endpoint without changing the result')

for (const aspect of [1.28, 1.58]) {
  const fittedDistances = new Map()
  for (const lengthMm of [200, 300, 400, 500]) {
    const bounds = getBeamRenderBounds(lengthMm)
    const camera = new PerspectiveCamera(BEAM_VIEW.fieldOfViewDegrees, aspect, BEAM_VIEW.near, BEAM_VIEW.far)
    camera.up.set(0, 0, 1)
    const target = new Vector3(...BEAM_VIEW.target)
    const direction = new Vector3(...BEAM_VIEW.cameraDirection).normalize()
    camera.position.copy(target).addScaledVector(direction, BEAM_VIEW.preferredDistance)
    camera.lookAt(target)
    camera.updateProjectionMatrix()
    camera.updateMatrixWorld(true)
    const requiredDistance = getRequiredBeamCameraDistance(camera, target, lengthMm)
    const distance = Math.max(BEAM_VIEW.preferredDistance, requiredDistance)
    fittedDistances.set(lengthMm, distance)
    camera.position.copy(target).addScaledVector(direction, distance)
    camera.lookAt(target)
    camera.updateProjectionMatrix()
    camera.updateMatrixWorld(true)
    let fits = true
    for (const x of [bounds.min[0], bounds.max[0]]) {
      for (const y of [bounds.min[1], bounds.max[1]]) {
        for (const z of [bounds.min[2], bounds.max[2]]) {
          const point = new Vector3(x, y, z).project(camera)
          if (Math.abs(point.x) > BEAM_VIEW.fitMargin + 1e-6 || Math.abs(point.y) > BEAM_VIEW.fitMargin + 1e-6 || point.z < -1 || point.z > 1) fits = false
        }
      }
    }
    assert(fits, `complete ${lengthMm / 10} cm scene fits camera at ${aspect}:1 viewport aspect`)
    if (aspect > 1.5 && lengthMm <= 300) assert(distance <= BEAM_VIEW.preferredDistance + 1e-8, `${lengthMm / 10} cm desktop view keeps preferred camera distance`)
  }
  assert(fittedDistances.get(500) > fittedDistances.get(300), `50 cm view backs off from 30 cm framing at ${aspect}:1`)
  assert(fittedDistances.get(400) <= fittedDistances.get(500), `framing changes progressively as length grows at ${aspect}:1`)
}
console.log(`${hasFailed ? 'FAIL' : 'PASS'} beam boundary, scaling, direction, fixed-end, and stress-color scale checks`)

if (hasFailed) process.exitCode = 1
