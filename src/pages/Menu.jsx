import { useNavigate } from 'react-router-dom'
import '../styles/Menu.css'

function Menu({ user }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  const handleAddToFriends = () => {
    window.open('https://line.me/R/ti/p/@613oqpvb', '_blank')
  }

  return (
    <div className="app">
      <div className="header">
        <div>Welcome, {user.userName}!</div>
      </div>

      <div className="menu-container">
        <p className="menu-subtitle">Select a category to view content</p>

        <div className="tiles-grid">
          <div 
            className="menu-tile lectures-tile"
            onClick={() => navigate('/lectures')}
          >
            <div className="tile-icon">📚</div>
            <div className="tile-title">Lectures</div>
            <div className="tile-description">View all available lectures</div>
          </div>

          <div 
            className="menu-tile seminars-tile"
            onClick={() => navigate('/seminars')}
          >
            <div className="tile-icon">🎤</div>
            <div className="tile-title">Seminars</div>
            <div className="tile-description">Explore upcoming seminars</div>
          </div>

          <div 
            className="menu-tile hands-on-tile"
            onClick={() => navigate('/hands-on')}
          >
            <div className="tile-icon">🛠️</div>
            <div className="tile-title">Hands-On Sessions</div>
            <div className="tile-description">Join practical hands-on training</div>
          </div>

          <div 
            className="menu-tile share-tile"
            onClick={() => navigate('/share-qr')}
          >
            <div className="tile-icon">📤</div>
            <div className="tile-title">Invite Friends</div>
            <div className="tile-description">Share QR code to invite users</div>
          </div>
        </div>

        <div className="menu-buttons">
          <button className="btn-add-friend" onClick={handleAddToFriends}>
            ➕ Add to LINE Friends
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Menu
