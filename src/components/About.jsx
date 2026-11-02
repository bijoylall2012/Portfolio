import { education } from '../data/portfolio.js'
import AboutVisual from './AboutVisual.jsx'

function About() {
  return (
    <section className="about page-shell" id="about" aria-labelledby="about-heading">
      <div className="section-heading section-heading--stacked">
        <p className="eyebrow"><span className="eyebrow__rule" /> ABOUT</p>
        <h2 id="about-heading">Curious about how things work. Even more interested in making them better.</h2>
      </div>
      <div className="about__grid">
        <AboutVisual />
        <div className="about__content">
          <p>I've been fascinated by machines for as long as I can remember. As a kid, I spent hours building cars, planes, and robots out of whatever I could find around the house. That curiosity eventually led me to mechanical engineering at BITS Pilani, where I became particularly interested in using mathematical models and simulations to understand how things move and behave.</p>
          <p>Today, I work in R&D at Mercedes-Benz, where I've applied engineering simulations, data analysis, and machine learning to problems involving occupant comfort and safety. What I enjoy most is figuring out how a technical idea can become something genuinely useful, whether that's making a car seat more comfortable, understanding a robot's movement, or designing something that solves an everyday problem.</p>
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
