import { experiences } from '../data/portfolio.js'

function Experience() {
  return (
    <section className="experience page-shell" id="experience" aria-labelledby="experience-heading">
      <div className="section-heading">
        <div><p className="eyebrow"><span className="eyebrow__rule" /> EXPERIENCE</p><h2 id="experience-heading">Work Experience</h2></div>
      </div>
      <div className="timeline-shell">
        <div className="timeline-scroll" role="region" aria-label="Work experience timeline; scroll to review all entries" tabIndex={0}>
          <ol className="timeline">
            {experiences.map((experience) => (
              <li className="timeline__item" key={`${experience.organization}-${experience.role}`}>
                <time className="timeline__date">{experience.dates}</time>
                <span className="timeline__marker" aria-hidden="true" />
                <div className="timeline__entry">
                  <div className="timeline__heading">
                    <h3>{experience.role}<span className="timeline__separator"> · </span><span className="timeline__company">{experience.organization}</span></h3>
                  </div>
                  <p className="timeline__location">{experience.location}</p>
                  <ul>{experience.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <p className="scroll-hint" aria-hidden="true">scroll for more ↕</p>
      </div>
    </section>
  )
}

export default Experience
