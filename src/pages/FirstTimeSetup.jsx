import { useState } from 'react'
import '../styles/FirstTimeSetup.css'

function FirstTimeSetup({ category, onSetupComplete }) {
  const [isComplete, setIsComplete] = useState(false)
  const BOT_ID = '613oqpvb'
  const BOT_PROFILE_URL = `https://line.me/ti/p/${BOT_ID}`

  const handleAddAsFreind = () => {
    // Open LINE bot profile in new window
    window.open(BOT_PROFILE_URL, '_blank')
    
    // After a short delay, show completion message
    setTimeout(() => {
      setIsComplete(true)
    }, 1000)
  }

  const handleContinue = () => {
    // Mark setup as complete in localStorage
    localStorage.setItem('setupComplete', 'true')
    onSetupComplete()
  }

  const getCategoryDetails = () => {
    const details = {
      student: {
        emoji: '👨‍🎓',
        title: 'Student',
        color: '#4CAF50',
        description: 'Access lectures, seminars, and hands-on sessions'
      },
      teacher: {
        emoji: '👨‍🏫',
        title: 'Teacher',
        color: '#2196F3',
        description: 'Manage and conduct training sessions'
      },
      parent: {
        emoji: '👨‍👩‍👧',
        title: 'Parent',
        color: '#FF9800',
        description: 'Monitor and track progress'
      }
    }
    return details[category] || details.student
  }

  const categoryInfo = getCategoryDetails()

  if (!isComplete) {
    return (
      <div className="first-time-setup">
        <div className="setup-container">
          <div className="setup-step">
            <div className="step-number">1</div>
            <h2>Welcome! 👋</h2>
            <p>You're registering as a <strong>{categoryInfo.title}</strong></p>
          </div>

          <div className="category-card" style={{ borderColor: categoryInfo.color }}>
            <div className="category-emoji">{categoryInfo.emoji}</div>
            <h3>{categoryInfo.title}</h3>
            <p>{categoryInfo.description}</p>
          </div>

          <div className="setup-step">
            <div className="step-number">2</div>
            <h2>Add Bot as Friend</h2>
            <p>Click the button below to add our bot as a friend on LINE. This allows us to send you updates and notifications.</p>
            
            <button 
              className="add-friend-btn"
              onClick={handleAddAsFreind}
              style={{ backgroundColor: categoryInfo.color }}
            >
              💬 Add {BOT_ID} as Friend
            </button>

            <div className="setup-info">
              <p>✓ After clicking, a new window will open</p>
              <p>✓ Click "Add" on the LINE bot profile</p>
              <p>✓ Come back to this app</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="first-time-setup">
      <div className="setup-container">
        <div className="setup-complete">
          <div className="success-icon">✅</div>
          <h2>Success! 🎉</h2>
          <p>You've successfully added the bot as a friend!</p>
          
          <div className="registered-info">
            <p>You're now registered as:</p>
            <div className="role-badge" style={{ backgroundColor: categoryInfo.color }}>
              {categoryInfo.emoji} {categoryInfo.title}
            </div>
          </div>

          <p className="next-step">Click below to continue to the app</p>
          
          <button 
            className="continue-btn"
            onClick={handleContinue}
            style={{ backgroundColor: categoryInfo.color }}
          >
            Continue to App →
          </button>
        </div>
      </div>
    </div>
  )
}

export default FirstTimeSetup
