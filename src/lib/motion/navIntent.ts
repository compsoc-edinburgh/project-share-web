// Tracks whether the latest route change came from the keyboard.
// Keyboard navigation must render instantly (no entrance animation);
// pointer navigation may animate. Cleared shortly after navigation.

let keyboardNav = false
let timer: ReturnType<typeof setTimeout> | undefined

export function markKeyboardNav() {
  keyboardNav = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    keyboardNav = false
  }, 250)
}

export const wasKeyboardNav = () => keyboardNav
