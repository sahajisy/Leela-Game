import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LeelaGame from './LeelaGame.jsx'

const showLeela = window.location.pathname.includes('leela')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {showLeela ? <LeelaGame /> : <App />}
  </StrictMode>,
)
