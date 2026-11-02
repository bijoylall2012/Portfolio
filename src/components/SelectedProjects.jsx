import { projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'

const homepageProjects = [
  'humanoid-locomotion',
  'campus-utility-design',
  'middle-ear-ossicles',
  'low-temperature-combustion',
].map((slug) => projects.find((project) => project.slug === slug))

function SelectedProjects() {
  return (
    <section className="projects page-shell" id="projects" aria-labelledby="projects-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><span className="eyebrow__rule" /> PROJECTS</p>
          <h2 id="projects-heading">Academic Research Projects</h2>
          <p className="projects__intro">Across computational design, robotics, biomechanics and simulation.</p>
        </div>
      </div>
      <div className="projects__grid" id="project-list">{homepageProjects.map((project) => <ProjectCard key={project.slug} project={project}/>)}</div>
    </section>
  )
}

export default SelectedProjects
