import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useShortcut } from '../lib/keyboard/KeyboardContext'

export interface NavEntry {
  index: number
  label: string
  path: string
}

export const NAV_ENTRIES: NavEntry[] = [
  { index: 1, label: 'Index', path: '/' },
  { index: 2, label: 'Projects', path: '/projects' },
  { index: 3, label: 'Team', path: '/team' },
  { index: 4, label: 'About', path: '/about' },
  { index: 5, label: 'Submit', path: '/submit' },
]

const NavBar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Number keys jump straight to pages — keyboard actions are never animated.
  useShortcut('1', () => navigate('/'), {
    label: '1–5',
    description: 'go to page',
    group: 1,
  })
  useShortcut('2', () => navigate('/projects'), {
    description: 'projects',
    group: 1,
    hidden: true,
  })
  useShortcut('3', () => navigate('/team'), {
    description: 'team',
    group: 1,
    hidden: true,
  })
  useShortcut('4', () => navigate('/about'), {
    description: 'about',
    group: 1,
    hidden: true,
  })
  useShortcut('5', () => navigate('/submit'), {
    description: 'submit',
    group: 1,
    hidden: true,
  })

  return (
    <header className="nav">
      <Link to="/" className="nav-logo" aria-label="Project Share home">
        PROJECT&nbsp;SHARE
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
                <span className="nav-index">{index}</span>
                {label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  )
}

export default NavBar
