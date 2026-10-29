import { useEffect, useRef } from 'react'
import BeamSimulation from './BeamSimulation.jsx'
import { contact } from '../data/portfolio.js'

const heroReturnAnimationKey = 'portfolio:hero-return-animation'

function hasHeroReturnAnimationRequest() {
  try {
    return window.sessionStorage.getItem(heroReturnAnimationKey) === '1'
  } catch {
    return false
  }
}

function consumeHeroReturnAnimationRequest() {
  if (!hasHeroReturnAnimationRequest()) return false
  try {
    window.sessionStorage.removeItem(heroReturnAnimationKey)
  } catch {
    // Navigation still works if session storage is unavailable.
  }
  return true
}

function Hero() {
  const heroCopyRef = useRef(null)

  useEffect(() => {
    let startFrame = 0
    let entranceAnimation

    const startEntranceIfRequested = () => {
      if (startFrame) window.cancelAnimationFrame(startFrame)
      startFrame = window.requestAnimationFrame(() => {
        startFrame = 0
        if (!consumeHeroReturnAnimationRequest()) return
        window.scrollTo({ top: 0, behavior: 'instant' })
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

        const heroCopy = heroCopyRef.current
        if (!heroCopy || typeof heroCopy.animate !== 'function') return

        entranceAnimation?.cancel()
        entranceAnimation = heroCopy.animate(
          [
            { opacity: 0.85, transform: 'translateY(8px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 700, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' },
        )
      })
    }

    startEntranceIfRequested()
    window.addEventListener('pageshow', startEntranceIfRequested)
    return () => {
      window.removeEventListener('pageshow', startEntranceIfRequested)
      if (startFrame) window.cancelAnimationFrame(startFrame)
      entranceAnimation?.cancel()
    }
  }, [])

  return (
    <section className="hero page-shell" id="home" aria-labelledby="hero-heading">
      <div className="hero__copy" ref={heroCopyRef}>
        <p className="eyebrow">MECHANICAL ENGINEER · HUMAN-CENTERED DESIGN</p>
        <h1 id="hero-heading">Engineering systems through <span>design</span>, <span>modeling</span>, and <span>simulation</span>.</h1>
        <p className="hero__description">Over two years at <strong>Mercedes-Benz</strong> working across CAE, robotics, and computational modeling, bringing together mechanical systems and the human experiences they shape.</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#projects">View Projects</a>
          <a className="button button--outline" href="#contact">Get in touch</a>
          <a className="button button--outline" href="/Resume1.pdf" target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero__metadata">
          <a href={`mailto:${contact.email}`}>bijoylall2012@gmail.com <span aria-hidden="true">↗</span></a><span aria-hidden="true">·</span>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><span aria-hidden="true">·</span>
          <span>Bengaluru, India</span>
        </div>
      </div>
      <div className="hero__visual-wrap">
        <h2 className="hero__visual-heading">CANTILEVER BEAM STRESS TEST</h2>
        <BeamSimulation />
      </div>
    </section>
  )
}

export default Hero
