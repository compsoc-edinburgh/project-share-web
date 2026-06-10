import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { useShortcut } from '../keyboard/KeyboardContext'

interface Prefs {
  theme: 'light' | 'dark'
  contrast: boolean
  zoom: number
}

const STORAGE_KEY = 'ps-prefs'
const ZOOM_STEP = 0.0625
const ZOOM_MIN = 0.875
const ZOOM_MAX = 1.25

const systemTheme = (): 'light' | 'dark' =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

const defaultPrefs = (): Prefs => ({
  theme: systemTheme(),
  contrast: false,
  zoom: 1,
})

function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultPrefs()
    const parsed = JSON.parse(raw) as Partial<Prefs>
    return { ...defaultPrefs(), ...parsed }
  } catch {
    return defaultPrefs()
  }
}

const ThemeContext = createContext<Prefs>(defaultPrefs())

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(loadPrefs)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = prefs.theme
    if (prefs.contrast) root.dataset.contrast = 'high'
    else delete root.dataset.contrast
    root.style.fontSize = prefs.zoom === 1 ? '' : `${prefs.zoom * 100}%`
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    } catch {
      // private mode etc. — preferences just won't persist
    }
  }, [prefs])

  // Theme/zoom toggles are keyboard-initiated: state flips instantly, no animation.
  useShortcut('m', () => setPrefs((p) => ({ ...p, theme: p.theme === 'dark' ? 'light' : 'dark' })), {
    label: 'M',
    description: 'light/dark',
    group: 6,
  })
  useShortcut('c', () => setPrefs((p) => ({ ...p, contrast: !p.contrast })), {
    label: 'C',
    description: 'high contrast',
    group: 7,
  })
  useShortcut('+', () => setPrefs((p) => ({ ...p, zoom: Math.min(ZOOM_MAX, p.zoom + ZOOM_STEP) })), {
    label: '+ -',
    description: 'zoom',
    group: 4,
  })
  useShortcut('=', () => setPrefs((p) => ({ ...p, zoom: Math.min(ZOOM_MAX, p.zoom + ZOOM_STEP) })), {
    description: 'zoom in',
    group: 4,
    hidden: true,
  })
  useShortcut('-', () => setPrefs((p) => ({ ...p, zoom: Math.max(ZOOM_MIN, p.zoom - ZOOM_STEP) })), {
    description: 'zoom out',
    group: 4,
    hidden: true,
  })
  useShortcut('r', () => setPrefs({ ...defaultPrefs(), theme: systemTheme() }), {
    label: 'R',
    description: 'reset',
    group: 5,
  })

  return <ThemeContext.Provider value={prefs}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
