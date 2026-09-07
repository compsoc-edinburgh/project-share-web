const DIRECTIONS: Record<string, string> = {
  ArrowUp: 'shake-up',
  ArrowDown: 'shake-down',
  ArrowLeft: 'shake-left',
  ArrowRight: 'shake-right',
}

const ALL = Object.values(DIRECTIONS)

/**
 * Nudge an element in one hard step when a key can't take you any further —
 * the "that's the end of the list" answer, borrowed from commitmono.com.
 */
export function shake(el: HTMLElement, key: string): void {
  const cls = DIRECTIONS[key] ?? 'shake-down'
  el.classList.remove(...ALL)
  void el.offsetWidth // restart the animation
  el.classList.add(cls)
  el.addEventListener('animationend', () => el.classList.remove(cls), {
    once: true,
  })
}
