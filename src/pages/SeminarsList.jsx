import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockApi } from '../services/mockApi'
import '../styles/ContentList.css'

function SeminarsList({ user }) {
  const navigate = useNavigate()
  const [seminars, setSeminars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSeminars()
  }, [])

  const fetchSeminars = async () => {
    setLoading(true)
    try {
      const data = await mockApi.getSeminars()
      setSeminars(data)
    } catch (error) {
      console.error('Error fetching seminars:', error)
      setSeminars([])
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = (seminarId) => {
    alert(`You have registered for seminar ID: ${seminarId}`)
  }

  return (
    <div className="app">
      <div className="header">
        <div className="header-content">
          <div className="header-title">🎤 Seminars</div>
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
            <p>Loading seminars...</p>
          </div>
        ) : seminars.length === 0 ? (
          <div className="empty-state">
            <p>No seminars available</p>
          </div>
        ) : (
          <div className="content-list">
            {seminars.map((seminar) => (
              <div key={seminar.id} className="content-card">
                <div className="card-header">
                  <h3>{seminar.title}</h3>
                  <span className="badge">{seminar.duration}</span>
                </div>
                <p className="card-description">{seminar.description}</p>
                <div className="card-meta">
                  <span className="meta-item">🎤 {seminar.speaker}</span>
                  <span className="meta-item">📅 {seminar.date}</span>
                </div>
                <div className="card-footer">
                  <span className="level">{seminar.category}</span>
                  <button 
                    className="btn-register"
                    onClick={() => handleRegister(seminar.id)}
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

export default SeminarsList
