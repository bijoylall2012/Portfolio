import { useEffect, useRef, useState } from 'react'
import { getSectionAccentScrollPosition, scrollToSectionAccent } from '../utils/sectionNavigation.js'
import { sitePath } from '../utils/sitePaths.js'

// Fixed outlines preserve the existing Mac glyphs without system-font substitution.
const themeToggleIcons = {
  light: {
    strokeWidth: 0.2,
    transform: 'translate(0.125 -0.125)',
    viewBox: '0 0 14.75 16.640625',
    path: 'M7.865000 14.625625 Q6.467500 14.625625 5.248750 14.105625 Q4.030000 13.585625 3.107813 12.659375 Q2.185625 11.733125 1.661563 10.514375 Q1.137500 9.295625 1.137500 7.898125 Q1.137500 6.898750 1.421875 5.960313 Q1.706250 5.021875 2.238437 4.213437 Q2.770625 3.405000 3.514063 2.775313 Q4.257500 2.145625 5.167500 1.739375 Q5.419375 1.625625 5.610313 1.682500 Q5.801250 1.739375 5.870312 1.922187 Q5.939375 2.105000 5.833750 2.373125 Q5.679375 2.771250 5.573750 3.340000 Q5.468125 3.908750 5.468125 4.412500 Q5.468125 7.264375 7.040313 8.836562 Q8.612500 10.408750 11.472500 10.408750 Q11.951875 10.408750 12.475938 10.331563 Q13.000000 10.254375 13.365625 10.132500 Q13.601250 10.059375 13.767812 10.132500 Q13.934375 10.205625 13.987188 10.388438 Q14.040000 10.571250 13.918125 10.831250 Q13.414375 11.879375 12.528750 12.744687 Q11.643125 13.610000 10.452813 14.117812 Q9.262500 14.625625 7.865000 14.625625 Z',
  },
  dark: {
    strokeWidth: 0.15,
    transform: 'translate(-0.25 0)',
    viewBox: '0 0 13.5 22.40625',
    path: 'M6.442187 4.431250 L7.109375 4.431250 L7.164062 4.485938 L7.164062 7.482813 L7.109375 7.537500 L6.442187 7.537500 L6.398438 7.482813 L6.398438 4.485938 Z M11.254687 5.820312 L11.735937 6.345313 L11.735937 6.367188 L9.614062 8.543750 L9.100000 8.007812 Z M2.504687 5.984375 L4.659375 8.150000 L4.134375 8.696875 L4.101562 8.696875 Q2.395312 6.990625 2.012500 6.520313 L2.012500 6.487500 Z M6.803125 8.040625 Q8.640625 8.040625 9.428125 9.965625 L9.537500 10.785938 Q9.537500 12.393750 7.864062 13.246875 Q7.251562 13.454688 6.835938 13.454688 Q5.293750 13.454688 4.429688 12.021875 Q4.112500 11.475000 4.112500 10.687500 Q4.112500 9.156250 5.731250 8.270313 Q6.321875 8.040625 6.803125 8.040625 Z M0.404687 10.381250 L3.303125 10.381250 L3.357812 10.435938 L3.357812 11.114062 L3.303125 11.168750 L0.404687 11.168750 L0.360937 11.114062 L0.360937 10.435938 Z M10.117188 10.381250 L13.070312 10.381250 L13.125000 10.435938 L13.125000 11.114062 L13.070312 11.168750 L10.117188 11.168750 L10.062500 11.114062 L10.062500 10.435938 Z M9.460938 12.831250 L9.482812 12.831250 Q10.631250 13.946875 11.604687 14.975000 L11.604687 14.996875 L11.079687 15.543750 L8.957812 13.378125 L8.957812 13.345313 Z M3.948437 12.973437 L3.970312 12.973437 L4.473437 13.487500 L4.473437 13.520312 L2.362500 15.685937 L1.848437 15.150000 L1.848437 15.117188 Z M6.442187 14.100000 L7.109375 14.100000 L7.164062 14.154688 L7.164062 17.151563 L7.109375 17.206250 L6.442187 17.206250 L6.398438 17.151563 L6.398438 14.154688 Z M6.081250 9.046875 Q4.976562 9.659375 4.976562 10.709375 Q4.976562 11.245313 5.184375 11.617188 Q5.775000 12.590625 6.835938 12.590625 Q7.109375 12.590625 7.525000 12.448438 Q8.673437 11.879687 8.673437 10.764062 L8.596875 10.217188 Q8.060937 8.893750 6.814062 8.893750 Q6.475000 8.893750 6.081250 9.046875 Z',
  },
}

const navigation = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Patents', href: '#patent', id: 'patent' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Research', href: '#research', id: 'research' },
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
            <svg className="theme-toggle__icon" viewBox={themeToggleIcons[theme].viewBox} aria-hidden="true" focusable="false">
              <path d={themeToggleIcons[theme].path} transform={themeToggleIcons[theme].transform} stroke="currentColor" strokeWidth={themeToggleIcons[theme].strokeWidth} strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
