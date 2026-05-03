import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Checkout from './pages/Checkout.jsx'
import CheckoutSuccess from './pages/CheckoutSuccess.jsx'
import CheckoutCancel from './pages/CheckoutCancel.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
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

            {/* Rutes legacy */}
            <Route path="payment" element={<Checkout />} />
            <Route path="thank-you" element={<CheckoutSuccess />} />

            {/* Dashboard d'Usuari (només rol 'client') */}
            <Route
              path="dashboard/user"
              element={
                <PrivateRoute allowedRole="client" redirectTo="/">
                  <UserDashboard />
                </PrivateRoute>
              }
            />

            {/* Dashboard d'Admin (només rol 'admin') */}
            <Route
              path="dashboard/admin"
              element={
                <PrivateRoute allowedRole="admin" redirectTo="/">
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)