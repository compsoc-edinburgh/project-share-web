import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

export interface ShortcutDef {
  /** Key as reported by KeyboardEvent.key, e.g. '1', 'ArrowDown', 'm', '?' */
  key: string
  /** Human label shown in the shortcut help bar/overlay, e.g. '1–4' */
  label: string
  description: string
  /** Order group for display: lower first */
  group?: number
  /** Hide from the help UI (e.g. duplicate arrow registrations) */
  hidden?: boolean
  handler: (e: KeyboardEvent) => void
}

interface KeyboardContextValue {
  register: (id: string, def: ShortcutDef) => () => void
  shortcuts: ShortcutDef[]
  helpOpen: boolean
  setHelpOpen: (open: boolean) => void
}

const KeyboardContext = createContext<KeyboardContextValue | null>(null)

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    target.isContentEditable
  )
}

export function KeyboardProvider({ children }: { children: ReactNode }) {
  const registry = useRef(new Map<string, ShortcutDef>())
  const [shortcuts, setShortcuts] = useState<ShortcutDef[]>([])
  const [helpOpen, setHelpOpen] = useState(false)

  const sync = useCallback(() => {
    const list = [...registry.current.values()].sort(
      (a, b) => (a.group ?? 99) - (b.group ?? 99)
    )
    setShortcuts(list)
  }, [])

  const register = useCallback(
    (id: string, def: ShortcutDef) => {
      registry.current.set(id, def)
      sync()
      return () => {
        registry.current.delete(id)
        sync()
      }
    },
    [sync]
  )

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Never hijack typing or browser-level chords.
      if (isTypingTarget(e.target)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      for (const def of registry.current.values()) {
        if (def.key === e.key) {
          e.preventDefault()
          def.handler(e)
          return
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const value = useMemo(
    () => ({ register, shortcuts, helpOpen, setHelpOpen }),
    [register, shortcuts, helpOpen]
  )

  return (
    <KeyboardContext.Provider value={value}>
      {children}
    </KeyboardContext.Provider>
  )
}

export function useKeyboard(): KeyboardContextValue {
  const ctx = useContext(KeyboardContext)
  if (!ctx) throw new Error('useKeyboard must be used inside KeyboardProvider')
  return ctx
}

let shortcutSeq = 0

/**
 * Register a global shortcut for the lifetime of the calling component.
 * Keyboard-initiated actions should be instant — don't animate them.
 */
export function useShortcut(
  key: string,
  handler: (e: KeyboardEvent) => void,
  options: { label?: string; description: string; group?: number; hidden?: boolean }
) {
  const { register } = useKeyboard()
  const handlerRef = useRef(handler)
  handlerRef.current = handler
  const idRef = useRef('')
  if (!idRef.current) idRef.current = `sc-${++shortcutSeq}`

  const { label, description, group, hidden } = options
  useEffect(() => {
    return register(idRef.current, {
      key,
      label: label ?? key.toUpperCase(),
      description,
      group,
      hidden,
      handler: (e) => handlerRef.current(e),
    })
  }, [key, label, description, group, hidden, register])
}
