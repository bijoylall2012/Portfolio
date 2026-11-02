import { useLayoutEffect, useRef } from 'react'

function IndustryResearchCard({ project, index, isFlipped, onToggle, children }) {
  const frontButtonRef = useRef(null)
  const backButtonRef = useRef(null)
  const moveFocusRef = useRef(false)
  const gestureRef = useRef({ x: 0, y: 0, moved: false })
  const detailsId = `industry-research-${index}-details`

  useLayoutEffect(() => {
    if (!moveFocusRef.current) return
    const control = isFlipped ? backButtonRef.current : frontButtonRef.current
    control?.focus({ preventScroll: true })
    moveFocusRef.current = false
  }, [isFlipped])

  const toggle = () => {
    moveFocusRef.current = true
    onToggle()
  }

  const handleBackClick = (event) => {
    if (event.target.closest('button, a') || gestureRef.current.moved || window.getSelection()?.toString()) return
    toggle()
  }

  return (
    <article
      className={`selected-research__flip-card${isFlipped ? ' selected-research__flip-card--flipped' : ''}`}
      aria-label={`${project.title}, ${isFlipped ? 'showing research details' : 'showing project image'}`}
      data-showing={isFlipped ? 'back' : 'front'}
    >
      <div className="selected-research__flipper">
        <div className="project-card selected-research__card selected-research__face selected-research__face--front" aria-hidden={isFlipped} inert={isFlipped}>
          {children}
          <div className="selected-research__details">
            <span className="project-card__category selected-research__category">{project.category}</span>
            <h3>{project.title}</h3>
            <p className="selected-research__organization">{project.organization}</p>
          </div>
          <button
            className="selected-research__flip-target"
            type="button"
            ref={frontButtonRef}
            tabIndex={isFlipped ? -1 : 0}
            aria-label={`Flip to show details for ${project.title}. Showing front of research card.`}
            aria-controls={detailsId}
            aria-expanded={isFlipped}
            onClick={toggle}
          >
            <span className="selected-research__flip-hint"><span aria-hidden="true">↻</span> Click to flip</span>
          </button>
        </div>
        <div
          className="project-card selected-research__card selected-research__face selected-research__face--back"
          id={detailsId}
          aria-hidden={!isFlipped}
          inert={!isFlipped}
          onClick={handleBackClick}
          onPointerDownCapture={(event) => { gestureRef.current = { x: event.clientX, y: event.clientY, moved: false } }}
          onPointerMoveCapture={(event) => {
            if (Math.hypot(event.clientX - gestureRef.current.x, event.clientY - gestureRef.current.y) > 8) gestureRef.current.moved = true
          }}
          onPointerCancelCapture={() => { gestureRef.current.moved = true }}
        >
          <header className="selected-research__back-heading">
            <span className="project-card__category selected-research__category">{project.category}</span>
            <h3>{project.title}</h3>
            <p className="selected-research__organization">{project.organization}</p>
          </header>
          <div
            className="selected-research__back-scroll"
            role="region"
            aria-label={`${project.title}: research details`}
            tabIndex={isFlipped ? 0 : -1}
            onScroll={() => { gestureRef.current.moved = true }}
          >
            <ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          </div>
          <button
            className="selected-research__flip-back"
            type="button"
            ref={backButtonRef}
            tabIndex={isFlipped ? 0 : -1}
            aria-label={`Flip back to ${project.title}. Showing back of research card.`}
            aria-controls={detailsId}
            aria-expanded={isFlipped}
            onClick={toggle}
          ><span aria-hidden="true">↻</span> Flip back</button>
        </div>
      </div>
    </article>
  )
}

export default IndustryResearchCard
