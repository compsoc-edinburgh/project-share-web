import type { ReactNode } from 'react'
import NavBar from './NavBar'
import KeyHints from './KeyHints'

interface PageShellProps {
  children: ReactNode
}

/** Shared chrome for all public pages: skip link, nav, key hint bar. */
const PageShell = ({ children }: PageShellProps) => (
  <>
    <a href="#main" className="skip-link">
      Skip to content
    </a>
    <NavBar />
    <main id="main" className="page-main">
      {children}
    </main>
    <KeyHints />
  </>
)

export default PageShell
