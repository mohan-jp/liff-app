import { useState } from 'react'
import QRCode from 'qrcode.react'
import '../styles/QRCodeGenerator.css'

const QRCodeGenerator = () => {
  const LIFF_ID = '2010635214-xOPFLeJc'
  const ADMIN_PASSWORD = 'admin123' // Change this to your password
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    // Check if admin session exists in localStorage
    return localStorage.getItem('adminLoggedIn') === 'true'
  })
  
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleAdminLogin = (e) => {
    e.preventDefault()
    setPasswordError('')
    
    if (passwordInput === ADMIN_PASSWORD) {
      localStorage.setItem('adminLoggedIn', 'true')
      setIsAdminLoggedIn(true)
      setPasswordInput('')
    } else {
      setPasswordError('❌ Incorrect password!')
      setPasswordInput('')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    setIsAdminLoggedIn(false)
    setPasswordInput('')
  }

  const categories = [
    { 
      name: 'Student', 
      emoji: '👨‍🎓', 
      color: '#4CAF50',
      description: 'Students attending lectures and seminars'
    },
    { 
      name: 'Teacher', 
      emoji: '👨‍🏫', 
      color: '#2196F3',
      description: 'Teachers conducting sessions'
    },
    { 
      name: 'Parent', 
      emoji: '👨‍👩‍👧', 
      color: '#FF9800',
      description: 'Parents monitoring progress'
    }
  ]

  const generateQRUrl = (category) => {
    return `https://liff.line.me/${LIFF_ID}?category=${category.name.toLowerCase()}`
  }

  const downloadQRCode = (categoryName) => {
    const qrElement = document.getElementById(`qr-${categoryName.toLowerCase()}`)
    const canvas = qrElement.querySelector('canvas')
    const link = document.createElement('a')
    link.download = `${categoryName}-qr-code.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  // Admin Login Form
  if (!isAdminLoggedIn) {
    return (
      <div className="admin-login-container">
        <div className="login-card">
          <div className="login-icon">🔐</div>
          <h1>Admin Access Required</h1>
          <p>Enter the admin password to access QR Code Generator</p>
          
          <form onSubmit={handleAdminLogin} className="login-form">
            <input
              type="password"
              placeholder="Enter admin password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="password-input"
              autoFocus
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
            <button type="submit" className="login-button">
              🔓 Login
            </button>
          </form>

          <div className="bot-info">
            <p>💬 <strong>Bot ID:</strong> @613oqpvb</p>
            <p className="bot-note">Contact bot admin for password</p>
          </div>
        </div>
      </div>
    )
  }

  // Main QR Generator Page
  return (
    <div className="qr-generator-container">
      <div className="qr-header">
        <div className="header-top">
          <h1>📱 QR Code Generator</h1>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
        <p>Generate and distribute QR codes for each user category</p>
        <p className="admin-badge">✅ Admin Access Granted</p>
      </div>

      <div className="qr-cards-grid">
        {categories.map((category) => (
          <div key={category.name} className="qr-card" style={{ borderTopColor: category.color }}>
            <div className="qr-card-emoji">{category.emoji}</div>
            <h2>{category.name}</h2>
            <p className="qr-card-description">{category.description}</p>

            <div id={`qr-${category.name.toLowerCase()}`} className="qr-code-container">
              <QRCode
                value={generateQRUrl(category)}
                size={200}
                level="H"
                includeMargin={true}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>

            <p className="qr-url">
              <small>
                {generateQRUrl(category)}
              </small>
            </p>

            <button 
              className="download-btn"
              onClick={() => downloadQRCode(category.name)}
              style={{ backgroundColor: category.color }}
            >
              ⬇️ Download QR Code
            </button>

            <div className="qr-instructions">
              <h4>Instructions:</h4>
              <ol>
                <li>Print or display this QR code</li>
                <li>User scans with LINE app</li>
                <li>App auto-registers with category: <strong>{category.name}</strong></li>
              </ol>
            </div>
          </div>
        ))}
      </div>

      <div className="qr-info-box">
        <h3>ℹ️ How it works:</h3>
        <ul>
          <li>Each QR code contains the LIFF URL with a category parameter</li>
          <li>When scanned, the user is registered with that specific category</li>
          <li>Category is stored in localStorage and used for personalization</li>
          <li>Users can be shown different content based on their category</li>
          <li><strong>Bot ID:</strong> @613oqpvb</li>
        </ul>
      </div>
    </div>
  )
}

export default QRCodeGenerator
