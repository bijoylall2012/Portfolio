import { useEffect, useRef, useState } from 'react'
import { getSectionAccentScrollPosition, scrollToSectionAccent } from '../utils/sectionNavigation.js'
import { sitePath } from '../utils/sitePaths.js'

const navigation = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Research', href: '#research', id: 'research' },
  { label: 'Patents', href: '#patent', id: 'patent' },
  { label: 'Childhood Creations', href: '#childhood-creations', id: 'childhood-creations' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

function isUnmodifiedPrimaryClick(event) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
}

function markHeroReturnAnimation() {
  try {
    window.sessionStorage.setItem('portfolio:hero-return-animation', '1')
  } catch {
    // Navigation still works if session storage is unavailable.
  }
}

function Header({ theme, onThemeToggle, isHomePage, isProjectPage }) {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigationTarget = useRef(null)

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 1)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    if (!isHomePage) return undefined

    const header = document.querySelector('.site-header')
    const accentLines = navigation
      .map(({ id }) => document.getElementById(id)?.querySelector('.eyebrow__rule'))
      .filter(Boolean)
    let historyFrame = 0

    const updateActiveSection = () => {
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0
      const atPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1
      const pendingTarget = navigationTarget.current

      if (pendingTarget) {
        const targetReached = Math.abs(window.scrollY - pendingTarget.top) <= 1
          || (pendingTarget.id === 'contact' && atPageBottom)
        if (targetReached) navigationTarget.current = null
        else {
          setActiveSection(pendingTarget.id)
          return
        }
      }

      if (window.scrollY <= 1) {
        setActiveSection('home')
        return
      }

      const alignmentTolerance = 1
      const reachedSections = navigation.filter(({ id }) => {
        const accentLine = document.getElementById(id)?.querySelector('.eyebrow__rule')
        return accentLine && accentLine.getBoundingClientRect().top <= headerBottom + alignmentTolerance
      })
      const nextActive = atPageBottom
        ? navigation[navigation.length - 1].id
        : reachedSections.at(-1)?.id ?? 'home'

      setActiveSection(nextActive)
    }

    const alignToCurrentHash = () => {
      window.cancelAnimationFrame(historyFrame)
      const targetId = window.location.hash.slice(1)
      if (!navigation.some(({ id }) => id === targetId)) return
      historyFrame = window.requestAnimationFrame(() => scrollToSectionAccent(targetId))
    }

    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateActiveSection)
    if (header) resizeObserver?.observe(header)
    accentLines.forEach((line) => resizeObserver?.observe(line))

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    window.addEventListener('scrollend', updateActiveSection)
    window.addEventListener('hashchange', alignToCurrentHash)
    window.addEventListener('popstate', alignToCurrentHash)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
      window.removeEventListener('scrollend', updateActiveSection)
      window.removeEventListener('hashchange', alignToCurrentHash)
      window.removeEventListener('popstate', alignToCurrentHash)
      resizeObserver?.disconnect()
      window.cancelAnimationFrame(historyFrame)
    }
  }, [isHomePage])

  return (
    <header className={`site-header${isScrolled ? ' site-header--scrolled' : ''}`}>
      <div className="site-header__inner">
        <a
          className="wordmark"
          href={isHomePage ? '#home' : sitePath('')}
          aria-label="Bijoy Bhaskar Lall, home"
          onClick={(event) => {
            if (isProjectPage && isUnmodifiedPrimaryClick(event)) markHeroReturnAnimation()
          }}
        ><span>bijoy</span><span className="wordmark__dot" aria-hidden="true">.</span><span>lall</span></a>
        <nav className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} id="primary-navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={isHomePage ? item.href : item.id === 'home' ? sitePath('') : `${sitePath('')}${item.href}`}
              aria-current={(isHomePage && activeSection === item.id) || (!isHomePage && item.id === 'projects') ? 'location' : undefined}
              onClick={(event) => {
                setMenuOpen(false)
                if (isProjectPage && item.id === 'home' && isUnmodifiedPrimaryClick(event)) markHeroReturnAnimation()
                if (!isHomePage || !isUnmodifiedPrimaryClick(event)) return

                event.preventDefault()
                if (window.location.hash !== item.href) window.history.pushState(null, '', item.href)
                setActiveSection(item.id)
                const targetTop = item.id === 'home' ? 0 : getSectionAccentScrollPosition(item.id)
                navigationTarget.current = targetTop !== null && Math.abs(window.scrollY - targetTop) > 1
                  ? { id: item.id, top: targetTop }
                  : null
                if (item.id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' })
                else scrollToSectionAccent(item.id)
              }}
            >{item.label}</a>
          ))}
        </nav>
        <div className="site-header__controls">
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <span /><span />
          </button>
          <button className="theme-toggle" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} aria-pressed={theme === 'dark'} onClick={onThemeToggle}>
            <span aria-hidden="true">{theme === 'dark' ? '☼' : '☾'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
