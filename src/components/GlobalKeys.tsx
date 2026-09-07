import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShortcut } from '../lib/keyboard/KeyboardContext'
import { NAV_ENTRIES } from './NavBar'
import { markKeyboardNav } from '../lib/motion/navIntent'
import { shake } from '../lib/motion/shake'

const SCROLL_STEP = 180

/** Everything the arrow keys can land on, in document order. */
const RING_SELECTOR = [
  '.nav-link',
  '#main a[href]',
  '#main button:not([disabled])',
  '#main input:not([type="hidden"])',
  '#main textarea',
  '#main [tabindex="0"]',
].join(', ')

/** Text blocks become focusable — and, on Enter, editable. */
const TEXT_SELECTOR = 'h1, h2, h3, h4, p, li, figcaption, blockquote'

const isVisible = (el: HTMLElement) =>
  el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0

function ring(): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>(RING_SELECTOR)].filter(
    isVisible
  )
}

/** Give every run of copy a tab stop, the way commitmono.com does. */
function markText() {
  const main = document.getElementById('main')
  if (!main) return
  main.querySelectorAll<HTMLElement>(TEXT_SELECTOR).forEach((el) => {
    if (el.hasAttribute('tabindex')) return
    if (el.closest('a, button')) return
    if (!el.textContent?.trim()) return
    el.tabIndex = 0
    el.dataset.edit = 'true'
  })
}

function startEditing(el: HTMLElement) {
  el.contentEditable = 'true'
  el.focus()
  const range = document.createRange()
  range.selectNodeContents(el)
  range.collapse(false)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}

/**
 * Site-wide keys (public pages only — mounted via PageShell). Arrows walk the
 * focus ring: nav, links, controls and every block of copy, in document order.
 * Enter opens the focused text for editing, Escape closes it. All movement is
 * instant: keyboard actions are never animated.
 */
const GlobalKeys = () => {
  const navigate = useNavigate()

  useEffect(() => {
    markText()
    const main = document.getElementById('main')
    if (!main) return
    // Copy arrives from the CMS after mount; keep tagging as it lands.
    const observer = new MutationObserver(markText)
    observer.observe(main, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  const goTo = (path: string) => {
    markKeyboardNav()
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const move = (step: 1 | -1, key: string) => {
    const items = ring()
    if (items.length === 0) return
    const active = document.activeElement
    const index =
      active instanceof HTMLElement ? items.indexOf(active) : -1

    // Nothing in the ring holds focus yet — start from what's on screen.
    if (index === -1) {
      const onScreen = items.find(
        (el) => el.getBoundingClientRect().bottom > 0
      )
      ;(onScreen ?? items[0]).focus()
      return
    }

    const next = items[index + step]
    if (next) next.focus()
    else shake(items[index], key)
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

  useShortcut('ArrowDown', (e) => move(1, e.key), {
    label: '↑ ↓ ← →',
    description: 'navigate',
    group: 1,
  })
  useShortcut('ArrowRight', (e) => move(1, e.key), {
    description: 'next element',
    group: 1,
    hidden: true,
  })
  useShortcut('ArrowUp', (e) => move(-1, e.key), {
    description: 'previous element',
    group: 1,
    hidden: true,
  })
  useShortcut('ArrowLeft', (e) => move(-1, e.key), {
    description: 'previous element',
    group: 1,
    hidden: true,
  })

  useShortcut(
    'Enter',
    () => {
      const el = document.activeElement
      if (!(el instanceof HTMLElement) || el.dataset.edit !== 'true') {
        return false // links and buttons keep their own Enter
      }
      startEditing(el)
    },
    { label: 'ENTER ESC', description: 'edit text', group: 8 }
  )

  useShortcut(
    'Escape',
    () => {
      const el = document.activeElement
      if (!(el instanceof HTMLElement)) return false
      if (el.isContentEditable) {
        el.contentEditable = 'false'
        return
      }
      el.blur()
    },
    { description: 'cancel edit', group: 8, hidden: true }
  )

  useShortcut('w', () => window.scrollBy({ top: -SCROLL_STEP, behavior: 'auto' }), {
    label: 'W A S D',
    description: 'scroll',
    group: 3,
  })
  useShortcut('s', () => window.scrollBy({ top: SCROLL_STEP, behavior: 'auto' }), {
    description: 'scroll down',
    group: 3,
    hidden: true,
  })
  useShortcut('a', () => window.scrollBy({ left: -SCROLL_STEP, behavior: 'auto' }), {
    description: 'scroll left',
    group: 3,
    hidden: true,
  })
  useShortcut('d', () => window.scrollBy({ left: SCROLL_STEP, behavior: 'auto' }), {
    description: 'scroll right',
    group: 3,
    hidden: true,
  })

  return null
}

export default GlobalKeys
