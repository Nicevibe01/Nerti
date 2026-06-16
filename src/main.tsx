import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Apply saved theme on load
const savedTheme = localStorage.getItem('nerti-theme')
if (savedTheme) {
  try {
    const { state } = JSON.parse(savedTheme)
    if (!state.isDark) {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  } catch {}
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
