import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import QRRegistration from './pages/QRRegistration'
import Menu from './pages/Menu'
import LecturesList from './pages/LecturesList'
import SeminarsList from './pages/SeminarsList'
import HandsOnList from './pages/HandsOnList'
import ShareQRCode from './pages/ShareQRCode'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initApp()
  }, [])

  const initApp = async () => {
    // Initialize LIFF if available
    try {
      if (typeof window !== 'undefined' && window.liff) {
        try {
          await window.liff.init({ liffId: '2010635214-xOPFLeJc' })
          
          if (window.liff.isLoggedIn()) {
            const profile = await window.liff.getProfile()
            console.log('LIFF logged in as:', profile.displayName)
          }
        } catch (error) {
          console.warn('LIFF init failed - development mode OK:', error.message)
        }
      }
    } catch (error) {
      console.warn('LIFF not available:', error)
    }
    
    // Restore user from localStorage
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.warn('localStorage error:', error)
      localStorage.removeItem('user')
    }
    
    // Ensure loading ends even if there are errors
    setTimeout(() => {
      setLoading(false)
    }, 100)
  }

  const handleRegistration = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/menu" /> : <QRRegistration onRegister={handleRegistration} />} />
        <Route path="/menu" element={user ? <Menu user={user} /> : <Navigate to="/" />} />
        <Route path="/lectures" element={user ? <LecturesList user={user} /> : <Navigate to="/" />} />
        <Route path="/seminars" element={user ? <SeminarsList user={user} /> : <Navigate to="/" />} />
        <Route path="/hands-on" element={user ? <HandsOnList user={user} /> : <Navigate to="/" />} />
        <Route path="/share-qr" element={user ? <ShareQRCode user={user} /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
