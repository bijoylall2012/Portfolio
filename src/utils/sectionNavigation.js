export function getSectionAccentScrollPosition(sectionId) {
  const header = document.querySelector('.site-header')
  const accentLine = document.getElementById(sectionId)?.querySelector('.eyebrow__rule')

  if (!header || !accentLine) return null

  const headerBottom = header.getBoundingClientRect().bottom
  const accentTop = accentLine.getBoundingClientRect().top
  const destination = window.scrollY + accentTop - headerBottom

  return Math.max(0, destination)
}

export function scrollToSectionAccent(sectionId, behavior = 'smooth') {
  const destination = getSectionAccentScrollPosition(sectionId)
  if (destination === null) return false

  window.scrollTo({ top: destination, behavior })
  return true
}
