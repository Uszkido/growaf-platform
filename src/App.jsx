import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Marketplace from './pages/Marketplace'
import SmartFarming from './pages/SmartFarming'
import KnowledgeHub from './pages/KnowledgeHub'
import Register from './pages/Register'
import VendorDashboard from './pages/VendorDashboard'
import BuyerDashboard from './pages/BuyerDashboard'
import AdminPortal from './pages/AdminPortal'

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('growaf_user')) || null)
  const [token, setToken] = useState(localStorage.getItem('growaf_token') || null)
  const [showAuthModal, setShowAuthModal] = useState(null) // 'login' or 'register'
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Buyer', location: '' })

  const API_URL = import.meta.env.VITE_API_URL || '/api'

  // Handle Authentication (Login for now, Registration moved to dedicated page)
  const handleAuth = async (e) => {
    e.preventDefault()
    const endpoint = showAuthModal === 'register' ? 'register' : 'login'
    try {
      const res = await fetch(`${API_URL}/users/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.token) {
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem('growaf_user', JSON.stringify(data.user))
        localStorage.setItem('growaf_token', data.token)
        setShowAuthModal(null)
      } else {
        alert(data.message || "Auth failed")
      }
    } catch (err) {
      console.error("Auth error:", err)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('growaf_user')
    localStorage.removeItem('growaf_token')
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout user={user} setShowAuthModal={setShowAuthModal} logout={logout} />}>
          <Route index element={<Home showAuthModal={showAuthModal} setShowAuthModal={setShowAuthModal} handleAuth={handleAuth} formData={formData} setFormData={setFormData} />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="smart-farming" element={<SmartFarming />} />
          <Route path="hub" element={<KnowledgeHub />} />
          <Route path="register" element={<Register />} />

          {/* Dashboards */}
          <Route path="dashboard/buyer" element={<BuyerDashboard />} />
          <Route path="dashboard/vendor" element={<VendorDashboard />} />
        </Route>

        {/* Hidden Admin Portal */}
        <Route path="/admin" element={<AdminPortal />} />
      </Routes>
    </Router>
  )
}

export default App
