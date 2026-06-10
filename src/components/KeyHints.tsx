import { useState } from 'react'
import { useKeyboard, useShortcut } from '../lib/keyboard/KeyboardContext'

/**
 * commitmono.com-style control hints: a fixed bar listing active shortcuts.
 * H toggles the bar; it's purely informational so hiding it changes nothing
 * about the bindings.
 */
const KeyHints = () => {
  const { shortcuts } = useKeyboard()
  const [visible, setVisible] = useState(true)

  useShortcut('h', () => setVisible((v) => !v), {
    label: 'H',
    description: 'hide keys',
    group: 9,
  })

  if (!visible) return null

  const visibleShortcuts = shortcuts.filter((s) => !s.hidden)

  return (
    <div className="keyhints" role="note" aria-label="Keyboard controls">
      {visibleShortcuts.map((s) => (
        <span className="keyhint" key={`${s.label}-${s.description}`}>
          <kbd>{s.label}</kbd> {s.description}
        </span>
      ))}
    </div>
  )
}

export default KeyHints
