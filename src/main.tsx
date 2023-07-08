import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Projects from './Pages/Projects'
import Components from './Pages/Components'

ReactDOM.render(
  <React.StrictMode>
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/components" element={<Components />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
