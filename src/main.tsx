import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Components from './Pages/Components'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/components" element={<Components />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
