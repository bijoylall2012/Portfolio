import { skillGroups } from '../data/portfolio.js'

function Skills() {
  return (
    <section className="skills page-shell" id="skills" aria-labelledby="skills-heading">
      <div className="section-heading section-heading--stacked">
        <p className="eyebrow"><span className="eyebrow__rule" /> TOOLKIT</p>
        <h2 id="skills-heading">Skills and Certifications</h2>
      </div>
      <div className="skills__groups">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.category}>
            <h3>{group.category}</h3>
            <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
