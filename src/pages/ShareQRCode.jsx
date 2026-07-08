import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode.react'
import '../styles/ShareQRCode.css'

function ShareQRCode({ user }) {
  const navigate = useNavigate()
  const liffUrl = 'https://liff.line.me/2010635214-xOPFLeJc'

  const downloadQRCode = () => {
    const qrElement = document.querySelector('canvas')
    if (qrElement) {
      const url = qrElement.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = url
      link.download = 'line-liff-qr-code.png'
      link.click()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(liffUrl)
    alert('LIFF URL copied to clipboard!')
  }

  return (
    <div className="app">
      <div className="header">
        <div className="header-content">
          <div className="header-title">📤 Share & Invite</div>
          <div className="header-user-info">
            <div className="user-name">{user.userName}</div>
            <div className="user-id">{user.userId}</div>
          </div>
        </div>
      </div>

      <div className="qr-share-container content-with-bottom-nav">
        <div className="qr-section">
          <h2>Scan to Add to LINE</h2>
          <p>Users can scan this QR code to add your app to their LINE channel</p>

          <div className="qr-code-wrapper">
            <QRCode
              value={liffUrl}
              size={256}
              level="H"
              includeMargin={true}
              renderAs="canvas"
              fgColor="#000000"
              bgColor="#ffffff"
            />
          </div>

          <div className="qr-info">
            <p className="qr-label">LIFF URL:</p>
            <p className="qr-url">{liffUrl}</p>
          </div>

          <div className="button-group">
            <button className="btn btn-primary" onClick={downloadQRCode}>
              ⬇️ Download QR Code
            </button>
            <button className="btn btn-secondary" onClick={copyToClipboard}>
              📋 Copy Link
            </button>
          </div>

          <div className="instructions">
            <h3>📱 How to Use</h3>
            <ol>
              <li>Share this QR code with users</li>
              <li>Users scan with their LINE app camera</li>
              <li>App opens in LINE → "Add to Contacts"</li>
              <li>They can now access your LIFF app</li>
            </ol>
          </div>

          <div className="share-methods">
            <h3>🔗 Share Methods</h3>
            <div className="share-buttons">
              <button 
                className="share-btn line-btn"
                onClick={() => {
                  // LINE share - open social plugin or share dialog
                  const shareText = `Check out my LIFF app! ${liffUrl}`
                  window.open(`https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`, '_blank')
                }}
              >
                💚 Share on LINE
              </button>
              <button 
                className="share-btn twitter-btn"
                onClick={() => {
                  const shareText = `Check out my LINE LIFF app! ${liffUrl}`
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank')
                }}
              >
                𝕏 Share on Twitter
              </button>
              <button 
                className="share-btn mail-btn"
                onClick={() => {
                  const subject = 'Check out my LIFF App'
                  const body = `Hey! I've created a LIFF app on LINE. You can access it here: ${liffUrl}`
                  window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
                }}
              >
                📧 Share via Email
              </button>
            </div>
          </div>

          <div className="qr-tips">
            <h3>💡 Tips</h3>
            <ul>
              <li>Print the QR code and display it at events</li>
              <li>Include it in your website or marketing materials</li>
              <li>Share the QR code image on social media</li>
              <li>Use the direct link for online promotion</li>
              <li>Add it to your LINE official account bio</li>
            </ul>
          </div>
        </div>

        <div className="app-info">
          <h3>📱 Your LIFF App Info</h3>
          <div className="info-box">
            <p><strong>App Name:</strong> Test-LIFF-APP</p>
            <p><strong>LIFF ID:</strong> 2010634921-Np2YO0dP</p>
            <p><strong>Type:</strong> Tall</p>
            <p><strong>Status:</strong> Active</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareQRCode
