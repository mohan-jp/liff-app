import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import QRRegistration from './pages/QRRegistration'
import LecturesList from './pages/LecturesList'
import SeminarsList from './pages/SeminarsList'
import HandsOnList from './pages/HandsOnList'
import ShareQRCode from './pages/ShareQRCode'
import BottomNavigation from './components/BottomNavigation'
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
            // Use LIFF profile data
            const userData = {
              userId: profile.userId,
              userName: profile.displayName,
              pictureUrl: profile.pictureUrl,
              statusMessage: profile.statusMessage,
              registeredAt: new Date().toISOString(),
            }
            setUser(userData)
            localStorage.setItem('user', JSON.stringify(userData))
          } else {
            // User not logged in via LIFF, check localStorage
            try {
              const storedUser = localStorage.getItem('user')
              if (storedUser) {
                setUser(JSON.parse(storedUser))
              }
            } catch (error) {
              console.warn('localStorage error:', error)
              localStorage.removeItem('user')
            }
          }
        } catch (error) {
          console.warn('LIFF init failed - development mode OK:', error.message)
          // Fallback to localStorage
          try {
            const storedUser = localStorage.getItem('user')
            if (storedUser) {
              setUser(JSON.parse(storedUser))
            }
          } catch (err) {
            console.warn('localStorage error:', err)
          }
        }
      } else {
        // LIFF not available, use localStorage
        try {
          const storedUser = localStorage.getItem('user')
          if (storedUser) {
            setUser(JSON.parse(storedUser))
          }
        } catch (error) {
          console.warn('localStorage error:', error)
          localStorage.removeItem('user')
        }
      }
    } catch (error) {
      console.warn('LIFF not available:', error)
      // Fallback to localStorage
      try {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (err) {
        console.warn('localStorage error:', err)
      }
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

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
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
        <Route path="/" element={user ? <Navigate to="/lectures" /> : <QRRegistration onRegister={handleRegistration} />} />
        <Route path="/lectures" element={user ? <LecturesList user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/seminars" element={user ? <SeminarsList user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/hands-on" element={user ? <HandsOnList user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/share-qr" element={user ? <ShareQRCode user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {user && <BottomNavigation />}
    </Router>
  )
}

export default App
