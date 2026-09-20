import { useEffect, useState } from 'react'

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
        <button
            type="button"
            aria-pressed={dark}
            onClick={() => setDark((current) => !current)}
            className="min-h-11 rounded-full border bg-surface px-4 text-content"
        >
            {dark ? "Light mode" : "Dark mode"}
        </button>
    )
}
