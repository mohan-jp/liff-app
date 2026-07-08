import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LecturesList from './pages/LecturesList'
import SeminarsList from './pages/SeminarsList'
import HandsOnList from './pages/HandsOnList'
import BottomNavigation from './components/BottomNavigation'
import './App.css'

function NotAuthorized() {
  const [liffStatus, setLiffStatus] = useState('Checking...')
  const [userAgent, setUserAgent] = useState('')

  useEffect(() => {
    setUserAgent(navigator.userAgent)
    
    // Check LIFF status
    try {
      if (typeof window !== 'undefined' && window.liff) {
        setLiffStatus('LIFF SDK available')
      } else {
        setLiffStatus('❌ LIFF SDK NOT available - Not accessed via LINE')
      }
    } catch (error) {
      setLiffStatus('❌ Error checking LIFF: ' + error.message)
    }
  }, [])

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      flexDirection: 'column',
      textAlign: 'center',
      padding: '20px',
      background: '#f5f5f5'
    }}>
      <div style={{ maxWidth: '400px' }}>
        <h1 style={{ fontSize: '48px', margin: '20px 0' }}>📱</h1>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>Access via LINE</h2>
        <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
          This app is designed to be accessed through LINE. Please scan the QR code or click the link in LINE to access the app.
        </p>
        <p style={{ color: '#999', fontSize: '14px', marginTop: '30px' }}>
          🔗 LIFF URL: https://liff.line.me/2010635214-xOPFLeJc
        </p>
        <div style={{ marginTop: '30px', padding: '15px', background: '#fff', borderRadius: '8px', textAlign: 'left', fontSize: '12px', color: '#666' }}>
          <p><strong>Debug Info:</strong></p>
          <p>Status: {liffStatus}</p>
          <p>Platform: {userAgent.includes('iPhone') ? 'iOS' : userAgent.includes('Android') ? 'Android' : 'Desktop'}</p>
          <p style={{ color: '#f44336', marginTop: '10px' }}>
            <strong>If you're seeing this in LINE:</strong><br/>
            1. Check DevTools (F12) Console for error messages<br/>
            2. Make sure LIFF ID is correct<br/>
            3. Try unfriend and refriend the bot<br/>
            4. Clear browser cache
          </p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initApp()
  }, [])

  const initApp = async () => {
    // Wait for LIFF SDK to load
    let retries = 0
    while (typeof window.liff === 'undefined' && retries < 20) {
      console.log('Waiting for LIFF SDK to load... (attempt ' + (retries + 1) + ')')
      await new Promise(resolve => setTimeout(resolve, 100))
      retries++
    }

    // Initialize LIFF if available
    try {
      if (typeof window !== 'undefined' && window.liff) {
        console.log('LIFF SDK found after ' + retries + ' attempts')
        try {
          console.log('Initializing LIFF with ID: 2010635214-xOPFLeJc')
          await window.liff.init({ liffId: '2010635214-xOPFLeJc' })
          console.log('LIFF initialized successfully')
          console.log('Is LIFF logged in:', window.liff.isLoggedIn())
          
          if (window.liff.isLoggedIn()) {
            console.log('User is logged in via LIFF')
            const profile = await window.liff.getProfile()
            console.log('LIFF Profile Data:', profile)
            console.log('Display Name from LIFF:', profile.displayName)
            console.log('User ID from LIFF:', profile.userId)
            // Use LIFF profile data - ALWAYS fetch fresh from LIFF
            const userData = {
              userId: profile.userId,
              userName: profile.displayName,
              pictureUrl: profile.pictureUrl,
              statusMessage: profile.statusMessage,
              registeredAt: new Date().toISOString(),
            }
            setUser(userData)
            // Always overwrite with fresh data from LIFF
            localStorage.setItem('user', JSON.stringify(userData))
          } else {
            console.log('User not logged in via LIFF - showing NotAuthorized')
            // User not logged in via LIFF, clear any old data
            localStorage.removeItem('user')
            setUser(null)
          }
        } catch (error) {
          console.error('LIFF init error:', error)
          console.error('Error message:', error.message)
          console.error('Error stack:', error.stack)
          // Even in error, clear old cached data to prevent stale data
          localStorage.removeItem('user')
          setUser(null)
        }
      } else {
        console.log('LIFF SDK not found even after waiting - not in LINE app')
        // LIFF not available, clear cached data
        localStorage.removeItem('user')
        setUser(null)
      }
    } catch (error) {
      console.error('Outer LIFF initialization failed:', error)
      // Clear old data on any error
      localStorage.removeItem('user')
      setUser(null)
    }
    
    // Ensure loading ends even if there are errors
    setTimeout(() => {
      console.log('Loading complete. User state:', user ? 'Logged in' : 'Not logged in')
      setLoading(false)
    }, 100)
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
        <Route path="/" element={user ? <Navigate to="/lectures" /> : <NotAuthorized />} />
        <Route path="/lectures" element={user ? <LecturesList user={user} /> : <Navigate to="/" />} />
        <Route path="/seminars" element={user ? <SeminarsList user={user} /> : <Navigate to="/" />} />
        <Route path="/hands-on" element={user ? <HandsOnList user={user} /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {user && <BottomNavigation />}
    </Router>
  )
}

export default App
