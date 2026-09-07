import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@fontsource/commit-mono/400.css'
import '@fontsource/commit-mono/700.css'
import '@fontsource/syne-mono/400.css'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/global.css'
import './styles/ui.css'
import './styles/pages.css'
import { dismissBoot } from './lib/boot'
import { KeyboardProvider } from './lib/keyboard/KeyboardContext'
import { ThemeProvider } from './lib/theme/ThemeContext'
import Home from './pages/Home'
import Showcase from './pages/Showcase'
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
        <ThemeProvider>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Showcase />} />
              <Route path="/team" element={<Team />} />
              <Route path="/about" element={<About />} />
              <Route path="/submit" element={<Submit />} />
              <Route path="/present" element={<Present />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </KeyboardProvider>
    </BrowserRouter>
  </StrictMode>
)

dismissBoot()
