import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockApi } from '../services/mockApi'
import '../styles/ContentList.css'

function HandsOnList({ user }) {
  const navigate = useNavigate()
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    setLoading(true)
    try {
      const data = await mockApi.getHandsOnSessions()
      setSessions(data)
    } catch (error) {
      console.error('Error fetching hands-on sessions:', error)
      setSessions([])
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = (sessionId) => {
    alert(`You have registered for hands-on session ID: ${sessionId}`)
  }

  return (
    <div className="app">
      <div className="header">
        <div className="header-content">
          <div className="header-title">🛠️ Hands-On Sessions</div>
          <div className="header-user-info">
            <div className="user-category">
              {user.category === 'student' && '👨‍🎓 Student'}
              {user.category === 'teacher' && '👨‍🏫 Teacher'}
              {user.category === 'parent' && '👨‍👩‍👧 Parent'}
            </div>
            <div className="user-name">{user.userName}</div>
            <div className="user-id">{user.userId}</div>
          </div>
        </div>
      </div>

      <div className="content-container content-with-bottom-nav">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading hands-on sessions...</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="empty-state">
            <p>No hands-on sessions available</p>
          </div>
        ) : (
          <div className="content-list">
            {sessions.map((session) => (
              <div key={session.id} className="content-card">
                <div className="card-header">
                  <h3>{session.title}</h3>
                  <span className="badge">{session.duration}</span>
                </div>
                <p className="card-description">{session.description}</p>
                <div className="card-meta">
                  <span className="meta-item">👨‍🏫 {session.instructor}</span>
                  <span className="meta-item">📅 {session.date}</span>
                </div>
                <div className="card-footer">
                  <span className="level">{session.difficulty}</span>
                  <button 
                    className="btn-register"
                    onClick={() => handleRegister(session.id)}
                  >
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HandsOnList
