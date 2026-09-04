import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { UI_STYLE } from './config'
import './index.css'

// Set before the first paint so the page canvas never flashes the wrong colour.
document.documentElement.dataset.ui = UI_STYLE

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
