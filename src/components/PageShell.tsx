import type { ReactNode } from 'react'
import NavBar from './NavBar'
import KeyBar from './KeyBar'
import GlobalKeys from './GlobalKeys'
import ScrollRail from './ScrollRail'

interface PageShellProps {
  children: ReactNode
}

/** Shared chrome for all public pages: skip link, nav, keys, hint bar. */
const PageShell = ({ children }: PageShellProps) => (
  <>
    <a href="#main" className="skip-link">
      Skip to content
    </a>
    <NavBar />
    <GlobalKeys />
    <main id="main" className="page-main">
      {children}
    </main>
    <KeyBar />
    <ScrollRail />
  </>
)

export default PageShell
