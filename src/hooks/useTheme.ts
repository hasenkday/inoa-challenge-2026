const STORAGE_KEY = 'theme'

export function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (saved === 'light') {
    document.documentElement.classList.add('light')
  }
}

export function toggleTheme(isLight: boolean) {
  const root = document.documentElement

  root.classList.add('theme-transition')

  if (isLight) {
    root.classList.add('light')
    localStorage.setItem(STORAGE_KEY, 'light')
  } else {
    root.classList.remove('light')
    localStorage.setItem(STORAGE_KEY, 'dark')
  }

  window.setTimeout(() => {
    root.classList.remove('theme-transition')
  }, 250)
}
