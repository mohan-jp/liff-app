// Mock API Service
// This provides simulated API responses for development/testing

const mockLectures = [
  {
    id: 'LEC001',
    title: 'Introduction to React',
    description: 'Learn the basics of React, including components, hooks, and state management.',
    instructor: 'John Smith',
    date: '2026-07-15',
    duration: '2 hours',
    level: 'Beginner'
  },
  {
    id: 'LEC002',
    title: 'Advanced JavaScript Concepts',
    description: 'Deep dive into closures, async/await, and functional programming patterns.',
    instructor: 'Sarah Johnson',
    date: '2026-07-20',
    duration: '3 hours',
    level: 'Advanced'
  },
  {
    id: 'LEC003',
    title: 'Web Performance Optimization',
    description: 'Techniques to improve website speed and user experience.',
    instructor: 'Mike Chen',
    date: '2026-07-25',
    duration: '2.5 hours',
    level: 'Intermediate'
  },
  {
    id: 'LEC004',
    title: 'CSS Mastery',
    description: 'Master modern CSS techniques including Grid, Flexbox, and animations.',
    instructor: 'Emma Davis',
    date: '2026-08-01',
    duration: '2 hours',
    level: 'Intermediate'
  },
]

const mockSeminars = [
  {
    id: 'SEM001',
    title: 'The Future of Web Development',
    description: 'A discussion about emerging technologies and trends in web development.',
    speaker: 'Tech Leaders Panel',
    date: '2026-07-18',
    duration: '1.5 hours',
    category: 'Technology Trends'
  },
  {
    id: 'SEM002',
    title: 'Building Scalable Applications',
    description: 'Best practices for designing systems that can grow with your business.',
    speaker: 'David Wilson',
    date: '2026-07-22',
    duration: '1 hour',
    category: 'Architecture'
  },
  {
    id: 'SEM003',
    title: 'Cybersecurity in Modern Apps',
    description: 'Essential security practices for web and mobile applications.',
    speaker: 'Lisa Anderson',
    date: '2026-07-28',
    duration: '1.5 hours',
    category: 'Security'
  },
  {
    id: 'SEM004',
    title: 'AI and Machine Learning in Web Apps',
    description: 'Integrating AI/ML features into your web applications.',
    speaker: 'Dr. Robert Kumar',
    date: '2026-08-05',
    duration: '2 hours',
    category: 'AI/ML'
  },
]

const mockHandsOnSessions = [
  {
    id: 'HOS001',
    title: 'Building a Todo App with React',
    description: 'Create a fully functional todo application from scratch using React hooks.',
    instructor: 'John Smith',
    date: '2026-07-17',
    duration: '3 hours',
    difficulty: 'Beginner',
    maxParticipants: 20
  },
  {
    id: 'HOS002',
    title: 'REST API Development with Node.js',
    description: 'Build a complete REST API backend using Node.js and Express.',
    instructor: 'Mike Chen',
    date: '2026-07-24',
    duration: '4 hours',
    difficulty: 'Intermediate',
    maxParticipants: 15
  },
  {
    id: 'HOS003',
    title: 'Database Design and SQL Optimization',
    description: 'Learn to design efficient databases and write optimized SQL queries.',
    instructor: 'Emma Davis',
    date: '2026-07-31',
    duration: '3.5 hours',
    difficulty: 'Intermediate',
    maxParticipants: 20
  },
  {
    id: 'HOS004',
    title: 'Deploying Apps to Cloud (AWS)',
    description: 'Complete guide to deploying and managing applications on AWS.',
    instructor: 'Sarah Johnson',
    date: '2026-08-07',
    duration: '3 hours',
    difficulty: 'Advanced',
    maxParticipants: 25
  },
  {
    id: 'HOS005',
    title: 'React Testing & Component Libraries',
    description: 'Master testing React components and building reusable component libraries.',
    instructor: 'David Wilson',
    date: '2026-08-10',
    duration: '2.5 hours',
    difficulty: 'Advanced',
    maxParticipants: 15
  },
]

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const mockApi = {
  async getLectures() {
    await delay(500)
    return mockLectures
  },

  async getSeminars() {
    await delay(500)
    return mockSeminars
  },

  async getHandsOnSessions() {
    await delay(500)
    return mockHandsOnSessions
  },

  async registerForEvent(eventId, userId) {
    await delay(300)
    return {
      success: true,
      message: `Successfully registered user ${userId} for event ${eventId}`,
      registeredAt: new Date().toISOString()
    }
  },

  async getUserRegistrations(userId) {
    await delay(400)
    return {
      lectures: ['LEC001', 'LEC003'],
      seminars: ['SEM001'],
      handsSessions: ['HOS001']
    }
  }
}
