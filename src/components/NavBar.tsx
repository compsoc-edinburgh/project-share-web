import { Link, useLocation } from 'react-router-dom'
import PixelFolder from './PixelFolder'

export interface NavEntry {
  index: number
  label: string
  path: string
}

export const NAV_ENTRIES: NavEntry[] = [
  { index: 1, label: 'Project Share', path: '/' },
  { index: 2, label: 'About', path: '/about' },
  { index: 3, label: 'Team', path: '/team' },
  { index: 4, label: 'Showcase', path: '/projects' },
  { index: 5, label: 'Submit', path: '/submit' },
]

const NavBar = () => {
  const { pathname } = useLocation()

  return (
    <header className="nav">
      <Link to="/" className="nav-logo" aria-label="Project Share home">
        <PixelFolder width={44} />
      </Link>
      <nav aria-label="Primary">
        <ol className="nav-list">
          {NAV_ENTRIES.map(({ index, label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className="nav-link"
                aria-current={pathname === path ? 'page' : undefined}
              >
                {String(index).padStart(2, '0')} {label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  )
}

export default NavBar
