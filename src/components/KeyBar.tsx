import { useState } from 'react'
import { useShortcut } from '../lib/keyboard/KeyboardContext'

interface KeyGroup {
  keys: string[]
  label: string
}

// Mirrors the control bar in the design (commitmono.com homage).
const GROUPS: KeyGroup[] = [
  { keys: ['↑', '↓', '←', '→'], label: 'Navigate' },
  { keys: ['1', '2', '3'], label: 'To section' },
  { keys: ['W', 'A', 'S', 'D'], label: 'Scroll' },
  { keys: ['+', '-'], label: 'Zoom' },
  { keys: ['R'], label: 'Reset' },
  { keys: ['M'], label: 'Light/dark' },
  { keys: ['C'], label: 'High contrast' },
  { keys: ['H'], label: 'Hide keys' },
]

/** Fixed bottom control-hint bar. H toggles it; bindings stay active either way. */
const KeyBar = () => {
  const [visible, setVisible] = useState(true)

  useShortcut('h', () => setVisible((v) => !v), {
    label: 'H',
    description: 'hide keys',
    group: 9,
  })

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
    <div className="keybar" role="note" aria-label="Keyboard controls">
      {GROUPS.map((g) => (
        <span className="keybar-group" key={g.label}>
          <span className="keybar-keys">
            {g.keys.map((k) => (
              <kbd key={k}>{k}</kbd>
            ))}
          </span>
          <span className="keybar-label">{g.label}</span>
        </span>
      ))}
    </div>
  )
}

export default KeyBar
