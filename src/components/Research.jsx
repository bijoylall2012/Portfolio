import { useState } from 'react'
import IndustryResearchCard from './IndustryResearchCard.jsx'
import { sitePath } from '../utils/sitePaths.js'
import { researchInterests } from '../data/portfolio.js'

const industryProjects = [
  {
    category: 'INDUSTRIAL ROBOTICS',
    title: 'Kinematic Analysis of Revised Articulated Manipulator',
    organization: 'Indira Gandhi Centre for Atomic Research',
    bullets: [
      'Mathematically modelled the forward and inverse kinematics of an industrial robotic manipulator using the Denavit–Hartenberg approach.',
      'Used MSC ADAMS to analyse the manipulator’s reachable workspace under multiple motion constraints.',
      'Presented findings to senior scientists to support future simulation and control studies.',
    ],
  },
  {
    category: 'OCCUPANT SAFETY',
    title: 'Effect of Seat Design Parameters on Seat Comfort Metrics',
    organization: 'Mercedes-Benz Research and Development India',
    bullets: [
      'Investigated how seat geometry influences occupant comfort using ABAQUS simulations, Python automation, and supervised machine learning.',
      'Built a database linking seat design parameters to objective comfort metrics to identify predictive relationships and support data-driven design decisions.',
      'Developed a methodology projected to save approximately €70,000 annually, coordinated technical reviews with 80+ engineers and managers, and earned a pre-placement full-time offer.',
    ],
  },
]

function Research() {
  const [flippedProjectIndex, setFlippedProjectIndex] = useState(null)

  const toggleIndustryProject = (index) => {
    setFlippedProjectIndex((current) => current === index ? null : index)
  }

  return (
    <>
      <section className="research page-shell" id="research" aria-labelledby="research-heading">
        <div className="section-heading section-heading--stacked">
          <p className="eyebrow"><span className="eyebrow__rule" /> RESEARCH</p>
          <h2 id="research-heading">Direction</h2>
        </div>
        <h3 className="research__lead">Engineering that turns innovation into technologies that improve human mobility, safety, and quality of life.</h3>
        <p className="research__intro">I’m interested in combining computational mechanics, intelligent systems, and human-centered design to solve physical problems. My work spans occupant comfort, robotics, and biomechanics, connected by a common question: <strong className="research__emphasis">how can engineering models help us design technologies that improve people’s lives?</strong></p>
        <div className="research-grid">
          {researchInterests.map((interest) => (
            <article className="research-card" key={interest.number}>
              <span>{interest.number}</span>
              <h3>{interest.title}</h3>
              <p>{interest.description}</p>
            </article>
          ))}
        </div>
        <p className="research__closing">What interests me most is bringing these areas together: using computational models to understand physical systems, data-driven methods to identify patterns, and physical validation to turn insights into practical designs. I want to bridge engineering analysis and real-world application by developing technologies grounded in both technical rigor and human needs.</p>

        <section className="selected-research" aria-labelledby="selected-research-heading">
          <div className="section-heading section-heading--stacked selected-research__heading">
            <h2 id="selected-research-heading">Industry Research Experience</h2>
          </div>
          <p className="selected-research__intro">Guided by my research interests, I have undertaken research projects spanning robotic kinematics, computational mechanics, and data-driven engineering. Please feel free to get in touch with me to discuss these experiences further.</p>
          <div className="selected-research__grid">
            <IndustryResearchCard
              project={industryProjects[0]}
              index={0}
              isFlipped={flippedProjectIndex === 0}
              onToggle={() => toggleIndustryProject(0)}
            >
              <div className="technical-visual selected-research__visual selected-research__visual--single">
                <img src={sitePath('images/photo11.png')} alt="Robotic manipulator assembly." loading="lazy" decoding="async" />
              </div>
            </IndustryResearchCard>
            <IndustryResearchCard
              project={industryProjects[1]}
              index={1}
              isFlipped={flippedProjectIndex === 1}
              onToggle={() => toggleIndustryProject(1)}
            >
              <div className="technical-visual selected-research__visual selected-research__visual--pair" role="group" aria-label="Seat comfort analysis images">
                <div className="selected-research__image-pair">
                  <img src={sitePath('images/photo12.png')} alt="Finite element model of an occupant seated in a vehicle seat." loading="lazy" decoding="async" />
                  <img src={sitePath('images/photo13.png')} alt="Seat comfort analysis contour visualization." loading="lazy" decoding="async" />
                </div>
              </div>
            </IndustryResearchCard>
          </div>
        </section>
      </section>

      <section className="childhood-creations page-shell" id="childhood-creations" aria-labelledby="childhood-creations-heading">
        <div className="section-heading section-heading--stacked">
          <p className="eyebrow"><span className="eyebrow__rule" /> CHILDHOOD CREATIONS</p>
          <h2 id="childhood-creations-heading">Wealth out of Waste</h2>
        </div>
        <div className="childhood-creations__content">
          <p className="childhood-creations__intro">As a child, I was fascinated by turning discarded materials into something entirely new. I once dismantled a toy fan my dad had gifted me to use its motor in a solar-powered airplane model, much to his dismay!</p>
          <p className="childhood-creations__intro childhood-creations__intro--continuation">Long before I had engineering tools or formal training, I was building, experimenting, and figuring things out with whatever I could find.</p>
        </div>

        <div className="childhood-creations__gallery" aria-label="Childhood creations photographs">
          <img src={sitePath('images/photo1.jpg')} alt="Handmade model airplane built from discarded materials at a school exhibition." loading="lazy" decoding="async" />
          <img src={sitePath('images/photo2.jpg')} alt="Childhood models displayed at an exhibition." loading="lazy" decoding="async" />
          <div className="childhood-creations__image-crop">
            <img src={sitePath('images/photo3.JPG')} alt="A child presents a robot to Ratan Tata at a school event." loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="childhood-creations__content">
          <div className="childhood-creations__block">
            <h3>From discarded materials to working models</h3>
            <p>As early as Grade 2, I was turning discarded bottles, cans, cardboard boxes, and old toys into cars, planes, rockets, and robots. Over the years, I exhibited these creations at my school's Green Fairs and other exhibitions. I was less interested in what the materials were meant for than in what I could make from them.</p>
          </div>

          <div className="childhood-creations__block">
            <h3>A robot that shook hands with Ratan Tata</h3>
            <p>Some of my favourite creations went beyond static models. I built a humanoid robot from cardboard boxes that extended its hand in response to a remote control, allowing it to shake hands with someone standing in front of it. I also built a remote-controlled Tata Nano model using thermocol and simple motors.</p>
            <p>One of my proudest childhood memories was presenting these creations to Mr. Ratan Tata during his visit to my school as Chief Guest at the Annual Founder's Day. The robot even shook his hand on stage.</p>
          </div>

          <div className="childhood-creations__block">
            <h3>A curiosity that kept growing</h3>
            <p>Over the next five years, I showcased my creations at school Green Fairs and external exhibitions, receiving several awards, including the Sardar Bhagwant Singh Award for Outstanding Creativity. These projects were my first experience of engineering: imagining something, figuring out how to build it with limited resources, and learning through trial and error.</p>
          </div>
        </div>

        <div className="childhood-creations__gallery childhood-creations__gallery--closing" aria-label="More childhood creations photographs">
          <img src={sitePath('images/photo7.JPG')} alt="A cardboard robot shakes hands with Ratan Tata at a school event." loading="lazy" decoding="async" />
          <img src={sitePath('images/photo5.jpg')} alt="Large cardboard robot displayed at a school exhibition." loading="lazy" decoding="async" />
          <img src={sitePath('images/photo6.jpg')} alt="Recycled creations displayed at a school exhibition." loading="lazy" decoding="async" />
        </div>
      </section>
    </>
  )
}

export default Research
