import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useSearchParams } from 'react-router-dom'
import LecturesList from './pages/LecturesList'
import SeminarsList from './pages/SeminarsList'
import HandsOnList from './pages/HandsOnList'
import BottomNavigation from './components/BottomNavigation'
import './App.css'

function NotAuthorized() {
  const [liffStatus, setLiffStatus] = useState('Checking...')
  const [userAgent, setUserAgent] = useState('')
  const [sdkLoaded, setSdkLoaded] = useState(false)

  useEffect(() => {
    setUserAgent(navigator.userAgent)
    
    // Check LIFF status
    setTimeout(() => {
      console.log('NotAuthorized component checking LIFF...')
      try {
        if (typeof window !== 'undefined' && typeof window.liff !== 'undefined') {
          console.log('LIFF SDK is available in NotAuthorized')
          setLiffStatus('✓ LIFF SDK available')
          setSdkLoaded(true)
        } else {
          console.log('LIFF SDK NOT available in NotAuthorized')
          setLiffStatus('❌ LIFF SDK NOT loaded - Make sure you are accessing via LINE app')
          setSdkLoaded(false)
        }
      } catch (error) {
        setLiffStatus('❌ Error checking LIFF: ' + error.message)
      }
    }, 100)
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
          🔗 LIFF URL:<br/>
          <code style={{ background: '#fff', padding: '10px', borderRadius: '4px', display: 'block', fontSize: '12px', marginTop: '10px', wordBreak: 'break-all' }}>
            https://liff.line.me/2010635214-xOPFLeJc
          </code>
        </p>
        <div style={{ marginTop: '30px', padding: '15px', background: '#fff', borderRadius: '8px', textAlign: 'left', fontSize: '12px', color: '#666' }}>
          <p><strong>Debug Info:</strong></p>
          <p>LIFF Status: <strong style={{ color: sdkLoaded ? '#4caf50' : '#f44336' }}>{liffStatus}</strong></p>
          <p>Platform: {userAgent.includes('iPhone') || userAgent.includes('iPad') ? '📱 iOS' : userAgent.includes('Android') ? '📱 Android' : '🖥️ Desktop/Browser'}</p>
          <p>In LINE App: {userAgent.includes('Line') ? '✓ Yes' : '❌ No (Try opening in LINE app)'}</p>
          <p style={{ color: '#f44336', marginTop: '10px' }}>
            <strong>Troubleshooting:</strong><br/>
            1. Make sure you opened the link <strong>IN LINE APP</strong><br/>
            2. Not in browser - LINE's in-app browser only<br/>
            3. Unfriend and refriend the bot<br/>
            4. Clear LINE app cache<br/>
            5. Check browser console (F12) for error details<br/>
            6. Make sure you are logged into LINE
          </p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [targetPage, setTargetPage] = useState(null)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    // Get the page parameter from URL (?page=lectures, etc)
    const pageParam = searchParams.get('page')
    console.log('Page parameter from URL:', pageParam)
    setTargetPage(pageParam || 'lectures') // Default to lectures
    
    initApp()
  }, [])

  const initApp = async () => {
    console.log('=== App.jsx initApp started ===')
    console.log('window.liff on start:', typeof window.liff)
    console.log('window.liffReady:', window.liffReady)
    console.log('User Agent:', navigator.userAgent)
    console.log('Is in LINE app:', navigator.userAgent.includes('Line'))
    
    // Wait for LIFF SDK to load (up to 10 seconds with multiple strategies)
    let retries = 0
    const maxRetries = 100 // 10 seconds at 100ms intervals
    
    while (typeof window.liff === 'undefined' && retries < maxRetries) {
      console.log('Waiting for LIFF... (' + (retries + 1) + '/' + maxRetries + ', ' + ((retries + 1) * 100) + 'ms)')
      await new Promise(resolve => setTimeout(resolve, 100))
      retries++
    }

    console.log('After ' + retries + ' retries: window.liff is', typeof window.liff)
    
    // Initialize LIFF if available
    try {
      if (typeof window !== 'undefined' && typeof window.liff !== 'undefined') {
        console.log('LIFF SDK found after ' + retries + ' attempts')
        try {
          console.log('Initializing LIFF with ID: 2010635214-xOPFLeJc')
          console.log('About to call window.liff.init()')
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
          console.error('Error name:', error.name)
          console.error('Error code:', error.code)
          // Even in error, clear old cached data to prevent stale data
          localStorage.removeItem('user')
          setUser(null)
        }
      } else {
        console.log('LIFF SDK not found - window.liff is:', typeof window.liff)
        console.log('This likely means you are NOT accessing via LINE app')
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

  // Map page parameter to route
  const getRedirectPath = () => {
    if (!user) return '/'
    switch(targetPage) {
      case 'lectures':
        return '/lectures'
      case 'seminars':
        return '/seminars'
      case 'hands-on':
        return '/hands-on'
      default:
        return '/lectures'
    }
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={getRedirectPath()} /> : <NotAuthorized />} />
      <Route path="/lectures" element={user ? <LecturesList user={user} /> : <Navigate to="/" />} />
      <Route path="/seminars" element={user ? <SeminarsList user={user} /> : <Navigate to="/" />} />
      <Route path="/hands-on" element={user ? <HandsOnList user={user} /> : <Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
      {user && <BottomNavigation />}
    </Routes>
  )
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper
