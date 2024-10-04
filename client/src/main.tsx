import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AllReservations } from './pages/AllReservations';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AllReservations />
  </StrictMode>,
)
