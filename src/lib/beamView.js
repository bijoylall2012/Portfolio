import { BEAM } from './beamSolver.js'
import { Vector3 } from 'three'

// Uniform rendering scale only: solver geometry and all reported values stay in SI units.
export const BEAM_VIEW = Object.freeze({
  visualScale: 0.65,
  fieldOfViewDegrees: 34,
  near: 0.01,
  far: 8,
  target: [0.0897, 0, -0.0148],
  cameraDirection: [0.1098, -0.9381, 0.3293],
  cameraPosition: [0.1402, -0.4316, 0.1367],
  preferredDistance: 0.46,
  fitMargin: 0.84,
  supportOffsetM: -0.012,
  floorLengthMarginM: 0.16,
  floorWidthM: 0.12,
  floorCenterZM: -0.12,
  floorThicknessM: 0.012,
})

/** Conservative render-space bounds for the support, beam, base, and load arrow. */
export function getBeamRenderBounds(lengthMm) {
  const scale = BEAM_VIEW.visualScale
  const lengthM = lengthMm / 1000
  const floorHalfLength = (lengthM + BEAM_VIEW.floorLengthMarginM) / 2
  const floorCenterX = BEAM_VIEW.supportOffsetM + lengthM / 2
  const floorHalfWidth = BEAM_VIEW.floorWidthM / 2
  const floorHalfDepth = BEAM_VIEW.floorThicknessM / 2

  return {
    min: [
      (floorCenterX - floorHalfLength) * scale,
      -floorHalfWidth * scale,
      (BEAM_VIEW.floorCenterZM - floorHalfDepth) * scale,
    ],
    max: [
      (floorCenterX + floorHalfLength) * scale,
      floorHalfWidth * scale,
      (BEAM.heightM / 2 + 0.068 + 0.028) * scale,
    ],
  }
}

/** Minimum camera distance that keeps the bounds inside the perspective frustum. */
export function getRequiredBeamCameraDistance(camera, target, lengthMm) {
  camera.updateMatrixWorld(true)
  const direction = camera.position.clone().sub(target).normalize()
  const right = new Vector3().setFromMatrixColumn(camera.matrixWorld, 0).normalize()
  const up = new Vector3().setFromMatrixColumn(camera.matrixWorld, 1).normalize()
  const halfVertical = Math.tan(camera.fov * Math.PI / 360) * BEAM_VIEW.fitMargin
  const halfHorizontal = halfVertical * camera.aspect
  const bounds = getBeamRenderBounds(lengthMm)
  let requiredDistance = camera.near + 0.01

  for (const x of [bounds.min[0], bounds.max[0]]) {
    for (const y of [bounds.min[1], bounds.max[1]]) {
      for (const z of [bounds.min[2], bounds.max[2]]) {
        const offset = new Vector3(x, y, z).sub(target)
        const alongView = offset.dot(direction)
        requiredDistance = Math.max(
          requiredDistance,
          alongView + Math.abs(offset.dot(right)) / halfHorizontal,
          alongView + Math.abs(offset.dot(up)) / halfVertical,
        )
      }
    }
  }

  return requiredDistance
}
