import { education } from '../data/portfolio.js'
import AboutVisual from './AboutVisual.jsx'

function About() {
  return (
    <section className="about page-shell" id="about" aria-labelledby="about-heading">
      <div className="section-heading section-heading--stacked">
        <p className="eyebrow"><span className="eyebrow__rule" /> ABOUT</p>
        <h2 id="about-heading">Mechanical Engineering: From design to real world impact.</h2>
      </div>
      <div className="about__grid">
        <AboutVisual />
        <div className="about__content">
          <p>I'm a mechanical engineer and CAE analyst at Mercedes-Benz Research and Development India, working on automotive interior simulations and occupant comfort. I developed a Python-based machine-learning workflow linking engineering data with subjective comfort assessments, with projected annual savings of nearly €70,000. My work also includes 30+ seat comfort and H-point hardware tests.</p>
          <p>At BITS Pilani, I explored robotic mechanisms, humanoid locomotion, and biomechanics through mathematical modeling and simulation. As a Teaching Assistant, I helped over 200 students solve kinematics problems. Across these experiences, I've been interested in understanding how physical systems behave and using that understanding to make better design decisions.</p>
          <article className="education-card" aria-label="Education">
            <div className="education-card__top"><span>EDUCATION</span><span>{education.dates}</span></div>
            <h3>{education.institution}</h3>
            <p>{education.degree}</p>
            <div className="education-card__bottom"><span>{education.result}</span></div>
            <p className="education-card__coursework">Computer Aided Engineering · Mechanisms and Machines · Robotics · Biomedical Engineering</p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default About
