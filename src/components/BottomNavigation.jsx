import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/BottomNavigation.css'

function BottomNavigation() {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { path: '/lectures', icon: '📚', label: 'Lectures' },
    { path: '/seminars', icon: '🎤', label: 'Seminars' },
    { path: '/hands-on', icon: '🛠️', label: 'Hands-On' },
    { path: '/share-qr', icon: '📤', label: 'Share' },
  ]

  return (
    <div className="bottom-navigation">
      <div className="nav-items">
        {menuItems.map((item) => (
          <div
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <div className="nav-icon">{item.icon}</div>
            <div className="nav-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BottomNavigation
