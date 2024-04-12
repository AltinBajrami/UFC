import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AppProvider from './context/AppContext.jsx'
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer position='top-center' autoClose={2000} />
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
)
