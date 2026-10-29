export function sitePath(path = '') {
  const relativePath = String(path).replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${relativePath}`
}

export function appPathname(pathname = window.location.pathname) {
  const basePath = import.meta.env.BASE_URL.replace(/\/+$/, '')
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'

  if (basePath && basePath !== '/' && normalizedPath === basePath) return '/'
  if (basePath && basePath !== '/' && normalizedPath.startsWith(`${basePath}/`)) {
    return normalizedPath.slice(basePath.length) || '/'
  }

  return normalizedPath
}
