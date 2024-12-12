import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './index.jsx'
import './index.css'
import { AppProvider } from './context/appContext.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 



ReactDOM.createRoot(document.getElementById('root')).render(
    <AppProvider>
      <App />
      <ToastContainer position='top-left' />
    </AppProvider>

)
