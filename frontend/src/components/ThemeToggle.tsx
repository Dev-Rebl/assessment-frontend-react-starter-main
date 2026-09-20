import { useEffect, useState } from 'react'
import { Button } from './Button'

export function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme) {
      return savedTheme === 'dark'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <Button
      aria-pressed={dark}
      variant="secondary"
      size="sm"
      onClick={() => setDark((current) => !current)}
    >
      {dark ? 'Light mode' : 'Dark mode'}
    </Button>
  )
}
