import { useNavigate } from 'react-router-dom'
import { useShortcut } from '../lib/keyboard/KeyboardContext'
import { NAV_ENTRIES } from './NavBar'
import { markKeyboardNav } from '../lib/motion/navIntent'

const SCROLL_STEP = 180

function sectionTops(): number[] {
  return [...document.querySelectorAll<HTMLElement>('[data-keynav-section]')]
    .map((el) => el.getBoundingClientRect().top + window.scrollY)
    .sort((a, b) => a - b)
}

/**
 * Site-wide navigation keys (public pages only — mounted via PageShell):
 * ↑/↓ jump between page sections, ←/→ switch pages, W/A/S/D raw-scroll,
 * 1–5 go straight to a page. All instant: keyboard actions are never animated.
 */
const GlobalKeys = () => {
  const navigate = useNavigate()

  const goTo = (path: string) => {
    markKeyboardNav()
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const currentIndex = () => {
    const path = window.location.pathname
    const i = NAV_ENTRIES.findIndex((e) => e.path === path)
    return i === -1 ? 0 : i
  }

  NAV_ENTRIES.forEach(({ index, path, label }) => {
    // Hooks in a loop are safe here: NAV_ENTRIES is a module constant.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useShortcut(String(index), () => goTo(path), {
      label: '1 2 3',
      description: label,
      group: 2,
      hidden: index !== 1,
    })
  })

  useShortcut('ArrowRight', () => goTo(NAV_ENTRIES[(currentIndex() + 1) % NAV_ENTRIES.length].path), {
    label: '↑ ↓ ← →',
    description: 'navigate',
    group: 1,
    hidden: true,
  })
  useShortcut(
    'ArrowLeft',
    () => goTo(NAV_ENTRIES[(currentIndex() - 1 + NAV_ENTRIES.length) % NAV_ENTRIES.length].path),
    { description: 'previous page', group: 1, hidden: true }
  )

  useShortcut(
    'ArrowDown',
    () => {
      const next = sectionTops().find((t) => t > window.scrollY + 8)
      window.scrollTo({ top: next ?? document.body.scrollHeight, behavior: 'auto' })
    },
    { description: 'next section', group: 1, hidden: true }
  )
  useShortcut(
    'ArrowUp',
    () => {
      const prev = [...sectionTops()].reverse().find((t) => t < window.scrollY - 8)
      window.scrollTo({ top: prev ?? 0, behavior: 'auto' })
    },
    { description: 'previous section', group: 1, hidden: true }
  )

  useShortcut('w', () => window.scrollBy({ top: -SCROLL_STEP, behavior: 'auto' }), {
    label: 'W A S D',
    description: 'scroll',
    group: 3,
    hidden: true,
  })
  useShortcut('s', () => window.scrollBy({ top: SCROLL_STEP, behavior: 'auto' }), {
    description: 'scroll down',
    group: 3,
    hidden: true,
  })
  useShortcut('a', () => false, { description: 'row left', group: 3, hidden: true })
  useShortcut('d', () => false, { description: 'row right', group: 3, hidden: true })

  return null
}

export default GlobalKeys
