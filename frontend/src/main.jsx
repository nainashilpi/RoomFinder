import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "react-hot-toast";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={12}
  containerStyle={{
    top: 20,
  }}
  toastOptions={{
    duration: 3000,

    style: {
      background: "#F6FAFD",
      color: "#0A1931",
      border: "2px solid #4A7FA7",
      borderRadius: "14px",
      padding: "16px 20px",
      fontSize: "15px",
      fontWeight: "600",
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    },

    success: {
      iconTheme: {
        primary: "#22C55E",
        secondary: "#FFFFFF",
      },
    },

    error: {
      duration: 4000,
      iconTheme: {
        primary: "#EF4444",
        secondary: "#FFFFFF",
      },
    },
  }}
/>
  </StrictMode>,
)
