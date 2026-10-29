/**
 * 2-node Euler–Bernoulli beam elements for a uniform cantilever under a tip load.
 * SI units: metres, newtons, pascals, radians.
 */
export const BEAM = Object.freeze({
  elasticModulusPa: 210e9,
  widthM: 0.04,
  heightM: 0.025,
  elementCount: 16,
  deformationDisplayScale: 8,
})

export const BEAM_CONTROL_LIMITS = Object.freeze({
  lengthMm: Object.freeze({ min: 200, max: 500 }),
  forceN: Object.freeze({ min: 100, max: 2000 }),
})

function solveDenseSystem(matrix, rhs) {
  const size = rhs.length
  const a = matrix.map((row, index) => [...row, rhs[index]])

  for (let column = 0; column < size; column += 1) {
    let pivot = column
    for (let row = column + 1; row < size; row += 1) {
      if (Math.abs(a[row][column]) > Math.abs(a[pivot][column])) pivot = row
    }
    if (Math.abs(a[pivot][column]) < 1e-18) throw new Error('Beam stiffness matrix is singular.')
    ;[a[column], a[pivot]] = [a[pivot], a[column]]

    const diagonal = a[column][column]
    for (let j = column; j <= size; j += 1) a[column][j] /= diagonal
    for (let row = 0; row < size; row += 1) {
      if (row === column) continue
      const factor = a[row][column]
      for (let j = column; j <= size; j += 1) a[row][j] -= factor * a[column][j]
    }
  }

  return a.map((row) => row[size])
}

export function solveCantilever({ lengthMm, forceN }) {
  const lengthM = lengthMm / 1000
  const { elasticModulusPa: E, widthM: b, heightM: h, elementCount } = BEAM
  const inertiaM4 = b * h ** 3 / 12
  const elementLengthM = lengthM / elementCount
  const dofCount = (elementCount + 1) * 2
  const stiffness = Array.from({ length: dofCount }, () => Array(dofCount).fill(0))
  const rhs = Array(dofCount).fill(0)

  for (let element = 0; element < elementCount; element += 1) {
    const le = elementLengthM
    const scale = E * inertiaM4 / le ** 3
    const local = [
      [12, 6 * le, -12, 6 * le],
      [6 * le, 4 * le ** 2, -6 * le, 2 * le ** 2],
      [-12, -6 * le, 12, -6 * le],
      [6 * le, 2 * le ** 2, -6 * le, 4 * le ** 2],
    ].map((row) => row.map((value) => value * scale))
    const indices = [2 * element, 2 * element + 1, 2 * element + 2, 2 * element + 3]
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) stiffness[indices[i]][indices[j]] += local[i][j]
    }
  }

  // Downward load is negative in the vertical displacement convention.
  rhs[dofCount - 2] = -forceN
  const freeDofs = Array.from({ length: dofCount - 2 }, (_, index) => index + 2)
  const reducedK = freeDofs.map((row) => freeDofs.map((column) => stiffness[row][column]))
  const reducedF = freeDofs.map((index) => rhs[index])
  const freeSolution = solveDenseSystem(reducedK, reducedF)
  const dofs = [0, 0, ...freeSolution]
  const nodes = Array.from({ length: elementCount + 1 }, (_, index) => ({
    xM: index * elementLengthM,
    displacementM: dofs[index * 2],
    rotationRad: dofs[index * 2 + 1],
  }))

  function sampleAt(xM) {
    const x = Math.max(0, Math.min(lengthM, xM))
    const element = Math.min(elementCount - 1, Math.floor(x / elementLengthM))
    const le = elementLengthM
    const r = Math.max(0, Math.min(1, (x - element * le) / le))
    const [v1, theta1, v2, theta2] = dofs.slice(2 * element, 2 * element + 4)
    const r2 = r * r
    const r3 = r2 * r
    const displacementM = (1 - 3 * r2 + 2 * r3) * v1
      + le * (r - 2 * r2 + r3) * theta1
      + (3 * r2 - 2 * r3) * v2
      + le * (-r2 + r3) * theta2
    const curvaturePerM = ((-6 + 12 * r) / le ** 2) * v1
      + ((-4 + 6 * r) / le) * theta1
      + ((6 - 12 * r) / le ** 2) * v2
      + ((-2 + 6 * r) / le) * theta2
    return { displacementM, curvaturePerM }
  }

  let maxVonMisesPa = 0
  for (let index = 0; index <= elementCount * 4; index += 1) {
    const x = lengthM * index / (elementCount * 4)
    const curvature = sampleAt(x).curvaturePerM
    maxVonMisesPa = Math.max(maxVonMisesPa, E * Math.abs(curvature) * h / 2)
  }

  return {
    lengthM,
    forceN,
    inertiaM4,
    nodes,
    sampleAt,
    tipDeflectionMm: Math.abs(nodes.at(-1).displacementM) * 1000,
    maxVonMisesMPa: maxVonMisesPa / 1e6,
    displayScale: BEAM.deformationDisplayScale,
  }
}

export function analyticalCantilever({ lengthMm, forceN }) {
  const lengthM = lengthMm / 1000
  const { elasticModulusPa: E, widthM: b, heightM: h } = BEAM
  const inertiaM4 = b * h ** 3 / 12
  return {
    tipDeflectionMm: forceN * lengthM ** 3 / (3 * E * inertiaM4) * 1000,
    maxVonMisesMPa: forceN * lengthM * (h / 2) / inertiaM4 / 1e6,
  }
}

export const BEAM_STRESS_SCALE_MAX_MPA = analyticalCantilever({
  lengthMm: BEAM_CONTROL_LIMITS.lengthMm.max,
  forceN: BEAM_CONTROL_LIMITS.forceN.max,
}).maxVonMisesMPa

/** Normalized stress position shared by the fixed legend and surface contour. */
export function getStressScalePosition(stressMPa, maximumStressMPa) {
  if (!(maximumStressMPa > 0) || !Number.isFinite(stressMPa)) return 0
  return Math.max(0, Math.min(1, stressMPa / maximumStressMPa))
}

export function validateCantilever(parameters, tolerance = 1e-8) {
  const numerical = solveCantilever(parameters)
  const analytical = analyticalCantilever(parameters)
  const deflectionRelativeError = Math.abs(numerical.tipDeflectionMm - analytical.tipDeflectionMm) / analytical.tipDeflectionMm
  const stressRelativeError = Math.abs(numerical.maxVonMisesMPa - analytical.maxVonMisesMPa) / analytical.maxVonMisesMPa
  return {
    numerical,
    analytical,
    deflectionRelativeError,
    stressRelativeError,
    passed: deflectionRelativeError <= tolerance && stressRelativeError <= tolerance,
  }
}
