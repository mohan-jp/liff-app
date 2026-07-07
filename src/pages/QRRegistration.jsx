import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Html5QrcodeScanner } from 'html5-qrcode'
import '../styles/QRRegistration.css'

function QRRegistration({ onRegister }) {
  const navigate = useNavigate()
  const [scanning, setScanning] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const qrScannerRef = useRef(null)
  const [scanner, setScanner] = useState(null)

  const startQRScanner = async () => {
    setScanning(true)
    // Wait for DOM to update before initializing scanner
    setTimeout(() => {
      try {
        const html5QrCode = new Html5QrcodeScanner('qr-reader', {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          disableFlip: false,
          aspectRatio: 1.77777
        }, false)

        const onScanSuccess = (decodedText) => {
          console.log('QR Code detected:', decodedText)
          handleQRCodeDetected(decodedText)
          stopQRScanner(html5QrCode)
        }

        const onScanFailure = (error) => {
          // Silently log scan attempts
          console.log('Scanning...')
        }

        html5QrCode.render(onScanSuccess, onScanFailure)
        setScanner(html5QrCode)
      } catch (error) {
        console.error('Error starting QR scanner:', error)
        setScanning(false)
        alert('Camera access issue. Please check:\n1. Browser permission for camera\n2. Use HTTPS (not HTTP)\n3. Try manual entry instead')
      }
    }, 100)
  }

  const stopQRScanner = async (scannerInstance) => {
    try {
      if (scannerInstance) {
        await scannerInstance.clear()
        setScanning(false)
      }
    } catch (error) {
      console.error('Error stopping scanner:', error)
    }
  }

  const handleQRCodeDetected = (qrData) => {
    // Parse QR code data (assuming format: userId,userName,email)
    const parts = qrData.split(',')
    if (parts.length >= 3) {
      setUserId(parts[0].trim())
      setUserName(parts[1].trim())
      setEmail(parts[2].trim())
    } else {
      setUserId(qrData)
      setUserName('User')
      setEmail('user@example.com')
    }
  }

  const handleManualRegistration = () => {
    if (!userId || !userName || !email) {
      alert('Please fill in all fields')
      return
    }

    const userData = {
      userId,
      userName,
      email,
      registeredAt: new Date().toISOString(),
    }

    onRegister(userData)
    setRegistered(true)
  }

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.clear().catch(() => {})
      }
    }
  }, [scanner])

  return (
    <div className="app">
      <div className="header">LINE LIFF App</div>
      
      <div className="qr-container">
        {!registered ? (
          <>
            <div className="qr-content">
              <h2>QR Code Registration</h2>
              <p>Scan the QR code below or enter your details manually</p>

              {scanning && (
                <>
                  <div id="qr-reader" style={{ width: '100%', marginRight: '0' }}></div>
                  <button className="btn btn-secondary" onClick={() => {
                    if (scanner) stopQRScanner(scanner)
                    setScanning(false)
                  }}>
                    ✕ Stop Scanning
                  </button>
                </>
              )}

              {!scanning && (
                <button className="btn btn-primary" onClick={startQRScanner}>
                  📱 Start QR Scan
                </button>
              )}

              <div className="divider">OR</div>

              <div className="form-group">
                <label>User ID</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter your User ID"
                />
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <button className="btn btn-success" onClick={handleManualRegistration}>
                ✓ Register as Friend
              </button>
            </div>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Registration Successful!</h2>
            <p>Welcome, {userName}!</p>
            <p>You are now registered as a friend.</p>
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/menu')}
              style={{ marginTop: '20px' }}
            >
              Continue to Menu
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QRRegistration
