/**
 * The loading screen in index.html covers the app until fonts are ready, so the
 * first thing anyone sees is finished type on the right background — no FOUC,
 * no light-then-dark flash. This tears it down once the app has painted.
 */

/** Never hold the page hostage to a slow font CDN. */
const FONT_TIMEOUT = 1200
const FADE = 200

export function dismissBoot(): void {
  const boot = document.getElementById('boot')
  if (!boot) return

  const remove = () => boot.remove()

  const hide = () => {
    let uncovered = false
    const uncover = () => {
      if (uncovered) return
      uncovered = true
      boot.dataset.done = ''
      boot.addEventListener('transitionend', remove, { once: true })
      setTimeout(remove, FADE + 100)
    }
    // Two frames, so React's first paint lands underneath before we uncover.
    // A background tab never paints, so a timer has to be able to win.
    requestAnimationFrame(() => requestAnimationFrame(uncover))
    setTimeout(uncover, 150)
  }

  const fonts = document.fonts
  if (!fonts) {
    hide()
    return
  }

  void Promise.race([
    fonts.ready,
    new Promise((resolve) => setTimeout(resolve, FONT_TIMEOUT)),
  ]).then(hide)
}
