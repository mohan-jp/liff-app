import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockApi } from '../services/mockApi'
import '../styles/ContentList.css'

function LecturesList({ user }) {
  const navigate = useNavigate()
  const [lectures, setLectures] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLectures()
  }, [])

  const fetchLectures = async () => {
    setLoading(true)
    try {
      const data = await mockApi.getLectures()
      setLectures(data)
    } catch (error) {
      console.error('Error fetching lectures:', error)
      setLectures([])
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = (lectureId) => {
    alert(`You have registered for lecture ID: ${lectureId}`)
  }

  return (
    <div className="app">
      <div className="header">
        <div className="header-with-back">
          <button className="back-button" onClick={() => navigate('/menu')}>
            ←
          </button>
          <div>Lectures</div>
        </div>
      </div>

      <div className="content-container">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading lectures...</p>
          </div>
        ) : lectures.length === 0 ? (
          <div className="empty-state">
            <p>No lectures available</p>
          </div>
        ) : (
          <div className="content-list">
            {lectures.map((lecture) => (
              <div key={lecture.id} className="content-card">
                <div className="card-header">
                  <h3>{lecture.title}</h3>
                  <span className="badge">{lecture.duration}</span>
                </div>
                <p className="card-description">{lecture.description}</p>
                <div className="card-meta">
                  <span className="meta-item">👨‍🏫 {lecture.instructor}</span>
                  <span className="meta-item">📅 {lecture.date}</span>
                </div>
                <div className="card-footer">
                  <span className="level">{lecture.level}</span>
                  <button 
                    className="btn-register"
                    onClick={() => handleRegister(lecture.id)}
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

export default LecturesList
