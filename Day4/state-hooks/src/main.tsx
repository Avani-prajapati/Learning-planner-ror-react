import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SweetShop from './SweetShop.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SweetShop />
  </StrictMode>,
)
