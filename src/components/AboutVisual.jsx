import { sitePath } from '../utils/sitePaths.js'

function AboutVisual() {
  return (
    <div className="about-visual">
      <img src={sitePath('Photo.jpg')} alt="Portrait of Bijoy Bhaskar Lall" />
    </div>
  )
}

export default AboutVisual
