import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Checkout from './pages/Checkout.jsx' // Renamed from Payment
import CheckoutSuccess from './pages/CheckoutSuccess.jsx' // Renamed from ThankYou
import CheckoutCancel from './pages/CheckoutCancel.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<CheckoutSuccess />} />
          <Route path="checkout/cancel" element={<CheckoutCancel />} />
          
          
          <Route path="payment" element={<Checkout />} />
          <Route path="thank-you" element={<CheckoutSuccess />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)