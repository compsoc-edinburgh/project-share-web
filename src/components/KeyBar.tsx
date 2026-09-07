import { useEffect, useState } from 'react'
import { useShortcut } from '../lib/keyboard/KeyboardContext'
import { prefersReducedMotion } from '../lib/motion/gsap'

interface Cap {
  /** Glyph printed on the cap. */
  glyph: string
  /** KeyboardEvent.key values that light it up; the first is sent on click. */
  keys: string[]
}

interface KeyGroup {
  caps: Cap[]
  label: string
}

const cap = (glyph: string, ...keys: string[]): Cap => ({
  glyph,
  keys: keys.length > 0 ? keys : [glyph.toLowerCase()],
})

// Mirrors the control bar in the design (commitmono.com homage).
const GROUPS: KeyGroup[] = [
  {
    caps: [
      cap('↑', 'ArrowUp'),
      cap('↓', 'ArrowDown'),
      cap('←', 'ArrowLeft'),
      cap('→', 'ArrowRight'),
    ],
    label: 'Navigate',
  },
  { caps: [cap('1'), cap('2'), cap('3')], label: 'To section' },
  { caps: [cap('W'), cap('A'), cap('S'), cap('D')], label: 'Scroll' },
  { caps: [cap('+', '+', '='), cap('-')], label: 'Zoom' },
  { caps: [cap('ENTER', 'Enter'), cap('ESC', 'Escape')], label: 'Edit text' },
  { caps: [cap('R')], label: 'Reset' },
  { caps: [cap('M')], label: 'Light/dark' },
  { caps: [cap('C')], label: 'High contrast' },
  { caps: [cap('H')], label: 'Hide keys' },
]

/** One flicker per visit, the first time someone actually uses the keyboard. */
let hasFlickered = false

/** Fixed bottom control-hint bar. H toggles it; bindings stay active either way. */
const KeyBar = () => {
  const [visible, setVisible] = useState(true)
  const [pressed, setPressed] = useState<string[]>([])
  const [flicker, setFlicker] = useState(false)

  useShortcut('h', () => setVisible((v) => !v), {
    label: 'H',
    description: 'hide keys',
    group: 9,
  })

  // Caps light up under the real key, the way a keyboard overlay should.
  useEffect(() => {
    const norm = (k: string) => (k.length === 1 ? k.toLowerCase() : k)

    const typing = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

    const onDown = (e: KeyboardEvent) => {
      if (typing(e.target)) return
      if (!hasFlickered && !prefersReducedMotion()) {
        hasFlickered = true
        setFlicker(true)
      }
      setPressed((p) => (p.includes(norm(e.key)) ? p : [...p, norm(e.key)]))
    }
    const onUp = (e: KeyboardEvent) =>
      setPressed((p) => p.filter((k) => k !== norm(e.key)))
    const clear = () => setPressed([])

    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    window.addEventListener('blur', clear)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
      window.removeEventListener('blur', clear)
    }
  }, [])

  // Clicking a cap presses the key for real — the bar is the same control
  // surface, not a picture of one. Caps stay out of the tab order on purpose:
  // every action here is reachable by pressing the key itself.
  const press = (c: Cap) => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: c.keys[0], bubbles: true })
    )
    setPressed((p) => [...p, c.keys[0]])
    setTimeout(
      () => setPressed((p) => p.filter((k) => k !== c.keys[0])),
      120
    )
  }

  if (!visible) {
    return (
      <button
        type="button"
        className="keybar-restore"
        aria-label="Show keyboard controls"
        onClick={() => setVisible(true)}
      >
        H
      </button>
    )
  }

  return (
    <div
      className={`keybar${flicker ? ' keybar--flicker' : ''}`}
      role="note"
      aria-label="Keyboard controls"
      onAnimationEnd={() => setFlicker(false)}
    >
      {GROUPS.map((g) => (
        <span className="keybar-group" key={g.label}>
          <span className="keybar-keys">
            {g.caps.map((c) => (
              <kbd
                key={c.glyph}
                data-active={
                  c.keys.some((k) => pressed.includes(k)) ? '' : undefined
                }
                onClick={() => press(c)}
              >
                {c.glyph}
              </kbd>
            ))}
          </span>
          <span className="keybar-label">{g.label}</span>
        </span>
      ))}
    </div>
  )
}

export default KeyBar
