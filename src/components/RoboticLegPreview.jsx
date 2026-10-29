import RoboticLegVisualization from './RoboticLegVisualization.jsx'
import { sitePath } from '../utils/sitePaths.js'

function RoboticLegPreview() {
  return (
    <article className="project-detail page-shell" aria-labelledby="robotic-leg-preview-heading">
      <a className="project-detail__back" href={sitePath('')}>
        <span aria-hidden="true">←</span> Return to portfolio home
      </a>
      <header className="project-detail__header">
        <h1 id="robotic-leg-preview-heading">Robotic Leg Visualization Preview</h1>
        <p>Development-only preview of the standalone six-degree-of-freedom illustrative model.</p>
      </header>
      <hr className="project-detail__separator" />
      <RoboticLegVisualization />
    </article>
  )
}

export default RoboticLegPreview
