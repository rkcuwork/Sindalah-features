// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './Context/AuthContext.tsx'
import { QueryProvider } from './lib/React-Query/QueryProvider.tsx'
import { CookiesProvider } from "react-cookie";


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  // </React.StrictMode>,
)
