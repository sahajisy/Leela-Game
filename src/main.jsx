import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'
import LeelaGame from './LeelaGame.jsx'
import History from './History.jsx'

const path = window.location.pathname
const showLeela = path === '/leela';
const showHistory = path === '/history';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {showLeela ? <LeelaGame /> : showHistory ? <History /> : <App />}
    <Analytics />
  </StrictMode>,
)
