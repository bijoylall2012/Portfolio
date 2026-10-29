import { useLayoutEffect, useState } from 'react'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Experience from './components/Experience.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'
import Research from './components/Research.jsx'
import RoboticLegPreview from './components/RoboticLegPreview.jsx'
import SelectedProjects from './components/SelectedProjects.jsx'
import Skills from './components/Skills.jsx'
import { projects } from './data/projects.js'
import { scrollToSectionAccent } from './utils/sectionNavigation.js'

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  })
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
  const project = projects.find((item) => pathname === `/projects/${item.slug}`)
  const isRoboticLegPreview = import.meta.env.DEV && pathname === '/__preview/robotic-leg'
  const isHomePage = pathname === '/'

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#211C18' : '#F8F4ED')
    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      // The selected theme remains active for this page if storage is unavailable.
    }
  }, [theme])

  useLayoutEffect(() => {
    const navigationEntry = window.performance.getEntriesByType('navigation')[0]
    const isPageReload = navigationEntry?.type === 'reload'

    if (isHomePage && isPageReload) {
      if (window.location.hash) {
        window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}`)
      }
      window.scrollTo({ top: 0, behavior: 'instant' })
      return undefined
    }

    const targetId = window.location.hash.slice(1)
    if (!targetId) return undefined

    const frame = window.requestAnimationFrame(() => scrollToSectionAccent(targetId, 'auto'))
    return () => window.cancelAnimationFrame(frame)
  }, [isHomePage])

  return (
    <>
      <Header theme={theme} onThemeToggle={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} isHomePage={isHomePage} isProjectPage={Boolean(project)} />
      <main>
        {isRoboticLegPreview ? (
          <RoboticLegPreview />
        ) : project ? (
          <ProjectDetail project={project} />
        ) : (
          <>
            <Hero />
            <About />
            <Skills />
            <SelectedProjects />
            <Experience />
            <Research />
            <Contact />
          </>
        )}
      </main>
      <footer className="site-footer">
        <div className="site-footer__inner">
          <span>BIJOY BHASKAR LALL · MECHANICAL ENGINEERING</span>
          <a href={isHomePage ? '#home' : '/#home'}>Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  )
}

export default App
