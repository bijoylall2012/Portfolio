import { useId } from 'react'
import { sitePath } from '../utils/sitePaths.js'

function ManipulatorVisual({ titleId }) {
  return (
    <svg viewBox="0 0 620 510" role="img" aria-labelledby={titleId}>
      <title id={titleId}>Abstract placeholder diagram of a robotic arm</title>
      <g className="visual-grid"><path d="M0 85H620M0 170H620M0 255H620M0 340H620M0 425H620"/><path d="M103 0V510M207 0V510M310 0V510M413 0V510M517 0V510"/></g>
      <g className="visual-dimension"><path d="M108 414H490M108 414v-15M490 414v-15"/><text x="299" y="438">WORKSPACE ENVELOPE</text></g>
      <g className="arm-shadow"><path d="m250 379 41-149 100-75 97 35 39-55"/></g>
      <g className="arm-structure"><path d="m250 379 41-149 100-75 97 35 39-55"/><path d="m250 379 42-9 40-140-41 0m41 0 58-75 42 0m0 0 44 42 38-56"/><path d="M435 155 391 212l-82 18m82-18 18-57"/></g>
      <g className="arm-joints"><circle cx="250" cy="379" r="17"/><circle cx="291" cy="230" r="13"/><circle cx="391" cy="155" r="12"/><circle cx="488" cy="190" r="11"/><circle cx="527" cy="135" r="8"/></g>
      <path className="arm-base" d="M212 397h77l-13 16h-52zM225 413h52v8h-52z"/>
      <g className="visual-label"><circle cx="291" cy="230" r="3"/><path d="M291 230h-76v-32h-55"/><text x="160" y="190">JOINT 02</text><circle cx="488" cy="190" r="3"/><path d="M488 190h50v-43h36"/><text x="526" y="138">END EFFECTOR</text></g>
      <g className="visual-axis"><path d="M50 453v-30m0 30h30m-30 0-19 15"/><text x="45" y="416">Z</text><text x="84" y="457">X</text><text x="24" y="482">Y</text></g>
    </svg>
  )
}

function LocomotionVisual() {
  return (
    <div className="technical-visual__image-pair">
      <img src={sitePath('images/frames.png')} alt="Coordinate-frame assignment for the six-link humanoid leg mechanism." loading="lazy" decoding="async" />
      <img src={sitePath('images/humanoid-locomotion/figure-07-random-configuration-alternate.png')} alt="Humanoid leg mechanism in an alternate random configuration." loading="lazy" decoding="async" />
    </div>
  )
}

function BiomechanicsVisual({ titleId }) {
  return (
    <svg viewBox="0 0 620 510" role="img" aria-labelledby={titleId}>
      <title id={titleId}>Abstract placeholder diagram of connected biomechanical structures</title>
      <g className="visual-grid"><path d="M0 85H620M0 170H620M0 255H620M0 340H620M0 425H620"/><path d="M103 0V510M207 0V510M310 0V510M413 0V510M517 0V510"/></g>
      <ellipse className="bio-contour" cx="306" cy="260" rx="162" ry="119"/><ellipse className="bio-contour" cx="306" cy="260" rx="124" ry="88"/><ellipse className="bio-contour" cx="306" cy="260" rx="84" ry="56"/>
      <path className="bio-path" d="M152 263c42-101 80-63 115-4 36 59 77 101 117 34 24-40 44-101 83-72"/>
      <g className="bio-nodes"><circle cx="152" cy="263" r="8"/><circle cx="267" cy="259" r="8"/><circle cx="384" cy="293" r="8"/><circle cx="467" cy="221" r="8"/><circle cx="306" cy="260" r="13"/></g>
      <g className="visual-label"><path d="M152 263H90v-43H50"/><text x="50" y="210">INPUT</text><path d="M467 221h54v-53h46"/><text x="519" y="159">RESPONSE</text><path d="M306 260v85h65"/><text x="376" y="350">MODEL CENTER</text></g>
      <g className="bio-scale"><path d="M228 408h156m-156-6v12m156-12v12"/><text x="280" y="428">SCHEMATIC · NTS</text></g>
    </svg>
  )
}

function EarOssiclesVisual() {
  return <img src={sitePath('images/image4.png')} alt="Finite-element mesh visualization of a middle-ear ossicle with a color-coded modal response." loading="lazy" decoding="async" />
}

function EngineVisual() {
  return (
    <div className="technical-visual__image-pair technical-visual__image-pair--engine">
      <img src={sitePath('Photo20.png')} alt="Efficiency comparison across combustion concepts." loading="lazy" decoding="async" />
      <img src={sitePath('Photo22.png')} alt="MATLAB model workflow for engine inputs and outputs." loading="lazy" decoding="async" />
    </div>
  )
}

function ProductVisual({ titleId }) {
  return (
    <svg viewBox="0 0 620 510" role="img" aria-labelledby={titleId}>
      <title id={titleId}>Illustrative placeholder product-design sketches, not project CAD</title>
      <g className="visual-grid"><path d="M0 100H620M0 200H620M0 300H620M0 400H620"/><path d="M100 0V510M200 0V510M300 0V510M400 0V510M500 0V510"/></g>
      <g className="product-sketch">
        <path d="M153 352h117v-28h-24v-114c0-22 16-39 38-39h39c22 0 38 17 38 39v115h-25v27h120"/>
        <path d="M153 352v22h117v-22m-9-142h-24m137 0h-24m-77 114h69"/>
        <path d="M349 180v-47h82v47m-82 0h82m-71 0v103m60-103v103m-60 0h60m-72 0h84v18h-84z"/>
      </g>
      <g className="visual-label"><path d="M182 352v-52h-58"/><text x="62" y="292">CONCEPT A</text><path d="M419 280h84v44h44"/><text x="510" y="341">CONCEPT B</text><text x="208" y="423">FORM STUDIES · SCHEMATIC</text></g>
    </svg>
  )
}

const visuals = { manipulator: ManipulatorVisual, locomotion: LocomotionVisual, biomechanics: BiomechanicsVisual, 'ear-ossicles': EarOssiclesVisual, engine: EngineVisual, product: ProductVisual }

function TechnicalVisual({ type }) {
  const titleId = `visual-title-${type}-${useId()}`
  const Illustration = visuals[type]
  return <div className={`technical-visual technical-visual--${type}`}><Illustration titleId={titleId} />{type !== 'locomotion' && type !== 'ear-ossicles' && type !== 'engine' && <span className="visual-placeholder">ILLUSTRATIVE PLACEHOLDER · NOT A PROJECT RESULT</span>}</div>
}

export default TechnicalVisual
