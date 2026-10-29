import { projects } from '../data/projects.js'
import HumanoidLocomotionDetail from './HumanoidLocomotionDetail.jsx'
import EarOssiclesDetail from './EarOssiclesDetail.jsx'
import LowTemperatureCombustionDetail from './LowTemperatureCombustionDetail.jsx'

function ProjectDetail({ project }) {
  const projectIndex = projects.findIndex((item) => item.slug === project.slug)
  const previousProject = projects[projectIndex - 1]
  const nextProject = projects[projectIndex + 1]

  return (
    <article className="project-detail page-shell" aria-labelledby="project-detail-heading">
      <a className="project-detail__back" href="/#projects">
        <span aria-hidden="true">←</span> Back
      </a>

      <header className="project-detail__header">
        <h1 id="project-detail-heading">{project.title}</h1>
        <p>{project.slug === 'humanoid-locomotion'
          ? 'This project models a six-degree-of-freedom humanoid leg and examines how joint motion relates to foot position and orientation through kinematic analysis and multibody simulation.'
          : project.description}</p>
      </header>

      <hr className={`project-detail__separator${project.slug === 'humanoid-locomotion' ? ' project-detail__separator--humanoid-intro' : ''}`} />

      {project.slug === 'humanoid-locomotion' ? (
        <HumanoidLocomotionDetail />
      ) : project.slug === 'middle-ear-ossicles' ? (
        <EarOssiclesDetail />
      ) : project.slug === 'low-temperature-combustion' ? (
        <LowTemperatureCombustionDetail />
      ) : (
        <section className="project-detail__content" aria-label={`${project.title} project details`}>
          <p>Project details will be added here.</p>
        </section>
      )}

      <hr className="project-detail__separator" />

      <nav className="project-detail__nav" aria-label="Project navigation">
        {previousProject ? (
          <a className="button button--outline" href={`/projects/${previousProject.slug}`}>Previous Project</a>
        ) : (
          <button className="button button--outline" type="button" disabled>Previous Project</button>
        )}
        {nextProject ? (
          <a className="button button--outline" href={`/projects/${nextProject.slug}`}>Next Project</a>
        ) : (
          <button className="button button--outline" type="button" disabled>Next Project</button>
        )}
        <a
          className="button button--outline"
          href="/"
          onClick={(event) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
            try {
              window.sessionStorage.setItem('portfolio:hero-return-animation', '1')
            } catch {
              // Navigation still works if session storage is unavailable.
            }
          }}
        >Home</a>
      </nav>
    </article>
  )
}

export default ProjectDetail
