import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app' // Importa o seu App.jsx (ou .js)
import './index.css' // Se você tiver um CSS global (gerado pelo Tailwind)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)