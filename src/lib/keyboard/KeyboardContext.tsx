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
import { useLocation } from 'react-router-dom'

export interface ShortcutDef {
  /** Key as reported by KeyboardEvent.key, e.g. '1', 'ArrowDown', 'm', '?' */
  key: string
  /** Human label for help UIs, e.g. '1–5' */
  label: string
  description: string
  /** Order group for display: lower first */
  group?: number
  /** Hide from help UIs (e.g. duplicate arrow registrations) */
  hidden?: boolean
  /**
   * Return false to pass the event to the next (older) matching shortcut —
   * lets page-level handlers take precedence and fall through when inactive.
   */
  handler: (e: KeyboardEvent) => void | boolean
}

interface KeyboardContextValue {
  register: (id: string, def: ShortcutDef) => () => void
  shortcuts: ShortcutDef[]
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
  const order = useRef<string[]>([])
  const [shortcuts, setShortcuts] = useState<ShortcutDef[]>([])
  const { pathname } = useLocation()
  const pathRef = useRef(pathname)
  pathRef.current = pathname

  const sync = useCallback(() => {
    const list = order.current
      .map((id) => registry.current.get(id))
      .filter((d): d is ShortcutDef => Boolean(d))
      .sort((a, b) => (a.group ?? 99) - (b.group ?? 99))
    setShortcuts(list)
  }, [])

  const register = useCallback(
    (id: string, def: ShortcutDef) => {
      registry.current.set(id, def)
      order.current.push(id)
      sync()
      return () => {
        registry.current.delete(id)
        order.current = order.current.filter((x) => x !== id)
        sync()
      }
    },
    [sync]
  )

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // The admin studio owns its keyboard entirely.
      if (pathRef.current.startsWith('/admin')) return
      // Never hijack typing or browser-level chords.
      if (isTypingTarget(e.target)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      // Most recently registered first → page-level handlers win,
      // falling through (return false) when not applicable.
      for (let i = order.current.length - 1; i >= 0; i--) {
        const def = registry.current.get(order.current[i])
        if (!def || def.key !== e.key) continue
        const handled = def.handler(e)
        if (handled !== false) {
          e.preventDefault()
          return
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const value = useMemo(() => ({ register, shortcuts }), [register, shortcuts])

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
 * Keyboard-initiated actions are instant — never animate them.
 */
export function useShortcut(
  key: string,
  handler: (e: KeyboardEvent) => void | boolean,
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
