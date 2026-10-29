import { useEffect, useRef, useState } from 'react'
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
  const [activeIndustryProject, setActiveIndustryProject] = useState(null)
  const returnFocusRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!activeIndustryProject) return undefined

    const scrollPosition = window.scrollY
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveIndustryProject(null)
      } else if (event.key === 'Tab') {
        event.preventDefault()
        closeButtonRef.current?.focus()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.scrollTo({ top: scrollPosition, behavior: 'instant' })
      window.removeEventListener('keydown', closeOnEscape)
      returnFocusRef.current?.focus()
    }
  }, [activeIndustryProject])

  const openIndustryProject = (event, project) => {
    returnFocusRef.current = event.currentTarget
    setActiveIndustryProject(project)
  }

  const activateIndustryProjectOnKey = (event, project) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openIndustryProject(event, project)
    }
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
          <p className="selected-research__intro">Guided by my research interests, I have undertaken research projects spanning robotic kinematics, computational mechanics, and data-driven engineering. Some details of this work cannot be shared publicly due to the respective organizations' confidentiality policies. Please feel free to get in touch with me to discuss my experience further.</p>
          <div className="selected-research__grid">
            <article
              className="project-card selected-research__card"
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`Open details for ${industryProjects[0].title}`}
              onClick={(event) => openIndustryProject(event, industryProjects[0])}
              onKeyDown={(event) => activateIndustryProjectOnKey(event, industryProjects[0])}
            >
              <div className="technical-visual selected-research__visual selected-research__visual--single">
                <img src="/images/photo11.png" alt="Robotic manipulator assembly." loading="lazy" decoding="async" />
              </div>
              <div className="selected-research__details">
                <span className="project-card__category selected-research__category">{industryProjects[0].category}</span>
                <h3>{industryProjects[0].title}</h3>
                <p className="selected-research__organization">{industryProjects[0].organization}</p>
              </div>
            </article>
            <article
              className="project-card selected-research__card"
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`Open details for ${industryProjects[1].title}`}
              onClick={(event) => openIndustryProject(event, industryProjects[1])}
              onKeyDown={(event) => activateIndustryProjectOnKey(event, industryProjects[1])}
            >
              <div className="technical-visual selected-research__visual selected-research__visual--pair" role="group" aria-label="Seat comfort analysis images">
                <div className="selected-research__image-pair">
                  <img src="/images/photo12.png" alt="Finite element model of an occupant seated in a vehicle seat." loading="lazy" decoding="async" />
                  <img src="/images/photo13.png" alt="Seat comfort analysis contour visualization." loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="selected-research__details">
                <span className="project-card__category selected-research__category">{industryProjects[1].category}</span>
                <h3>{industryProjects[1].title}</h3>
                <p className="selected-research__organization">{industryProjects[1].organization}</p>
              </div>
            </article>
          </div>
        </section>
      </section>

      {activeIndustryProject && (
        <div className="industry-project-modal" onClick={() => setActiveIndustryProject(null)}>
          <section
            className="industry-project-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="industry-project-modal-title"
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="industry-project-modal__close"
              type="button"
              aria-label="Close project details"
              ref={closeButtonRef}
              onClick={() => setActiveIndustryProject(null)}
            >×</button>
            <span className="project-card__category industry-project-modal__category">{activeIndustryProject.category}</span>
            <h2 id="industry-project-modal-title">{activeIndustryProject.title}</h2>
            <p className="selected-research__organization">{activeIndustryProject.organization}</p>
            <ul>
              {activeIndustryProject.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </section>
        </div>
      )}

      <section className="patent page-shell" id="patent" aria-labelledby="patent-heading">
        <div className="section-heading section-heading--stacked">
          <p className="eyebrow"><span className="eyebrow__rule" /> PATENTS</p>
          <h2 id="patent-heading">Innovations in Occupant Safety</h2>
        </div>
        <p className="patent__description">Co-inventor on 3 patent-pending technologies focused on preventing severe injuries in car crashes. <strong className="patent__filing">Filed at the Patent Offices of India and Germany.</strong></p>
        <p className="patent__description">Advanced occupant protection through iterative simulation, hardware testing, and design refinement, translating engineering analysis into innovative crash-safety solutions.</p>
        <div className="patent__cards">
          <article className="patent-card">
            <h3><span className="patent-card__number" aria-hidden="true">01</span> &quot;A Reinforceable Seatbelt Assembly for a Vehicle.&quot;</h3>
            <p>A novel concept seat belt capable of dynamically adjusting it stiffness in the event of a crash, thus mitigating injuries due to localized abdominal loading by effectively distributing crash forces.</p>
          </article>
          <article className="patent-card">
            <h3><span className="patent-card__number" aria-hidden="true">02</span> &quot;An Occupant Restraint System for a Vehicle.&quot;</h3>
            <p>An electronically monitored seat belt so as to control the length of the belt as per the tension developed in it during crash, and prevent serious injuries due to violent sliding of the belt.</p>
          </article>
          <article className="patent-card">
            <h3><span className="patent-card__number" aria-hidden="true">03</span> &quot;A Novel Occupant Restraint System for a Vehicle.&quot;</h3>
            <p>An electronically monitored seat belt, with a crash-detected length extension mechanism, which improves occupant restraint performance.</p>
          </article>
        </div>
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
          <img src="/images/photo1.jpg" alt="Handmade model airplane built from discarded materials at a school exhibition." loading="lazy" decoding="async" />
          <img src="/images/photo2.jpg" alt="Childhood models displayed at an exhibition." loading="lazy" decoding="async" />
          <div className="childhood-creations__image-crop">
            <img src="/images/photo3.JPG" alt="A child presents a robot to Ratan Tata at a school event." loading="lazy" decoding="async" />
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
          <img src="/images/photo7.JPG" alt="A cardboard robot shakes hands with Ratan Tata at a school event." loading="lazy" decoding="async" />
          <img src="/images/photo5.jpg" alt="Large cardboard robot displayed at a school exhibition." loading="lazy" decoding="async" />
          <img src="/images/photo6.jpg" alt="Recycled creations displayed at a school exhibition." loading="lazy" decoding="async" />
        </div>
      </section>
    </>
  )
}

export default Research
