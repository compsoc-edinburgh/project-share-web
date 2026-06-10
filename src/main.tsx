import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/tokens.css'
import './styles/global.css'
import { KeyboardProvider } from './lib/keyboard/KeyboardContext'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Team from './pages/Team'
import About from './pages/About'
import Submit from './pages/Submit'
import Present from './pages/Present'
import NotFound from './pages/NotFound'

// Studio is heavy — only people who visit /admin download it.
const Admin = lazy(() => import('./pages/Admin'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <KeyboardProvider>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/team" element={<Team />} />
            <Route path="/about" element={<About />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/present" element={<Present />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </KeyboardProvider>
    </BrowserRouter>
  </StrictMode>
)
