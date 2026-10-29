import TechnicalVisual from './TechnicalVisual.jsx'

function ProjectCard({ project }) {
  return (
    <a className="project-card" href={`/projects/${project.slug}`} aria-label={`View project: ${project.title}`}>
      <TechnicalVisual type={project.visual} />
      <div className="project-card__heading">
        <h3>{project.title}</h3>
        <span className="project-card__category">{project.category}</span>
      </div>
      <p className="project-card__description">{project.description}</p>
    </a>
  )
}

export default ProjectCard
