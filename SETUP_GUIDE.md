# LINE LIFF App - Setup and Development Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Start Development Server
```bash
npm run dev
```
The app will open at `http://localhost:3000`

### 3. Configure LIFF ID (Optional for Development)
For development/testing without LINE connection:
- The app works with mock data out of the box
- No LIFF ID required to test locally

For production/real LINE integration:
1. Go to [LINE Console](https://console.line.biz/)
2. Create a channel
3. Create a LIFF app
4. Copy your LIFF ID
5. Update `src/App.jsx`:
   ```javascript
   await liff.init({ liffId: 'YOUR_LIFF_ID_HERE' })
   ```

## 📁 File Structure

```
src/
├── pages/                    # Page components
│   ├── QRRegistration.jsx   # QR code registration
│   ├── Menu.jsx             # Main menu (3 tiles)
│   ├── LecturesList.jsx     # Lectures listing
│   ├── SeminarsList.jsx     # Seminars listing
│   └── HandsOnList.jsx      # Hands-on sessions
├── services/
│   └── mockApi.js           # Mock backend API with sample data
├── styles/                  # Component styles
│   ├── QRRegistration.css
│   ├── Menu.css
│   └── ContentList.css
├── App.jsx                  # Main app with routing
├── main.jsx                 # Entry point
└── index.css                # Global styles
```

## 🔄 User Flow

```
QR Registration
    ↓
Enter Details (Manual or QR Scan)
    ↓
Main Menu (3 Tiles)
    ├→ Lectures List
    ├→ Seminars List
    └→ Hands-On Sessions List
```

## 🎨 UI Components

### 1. QRRegistration Page
- Camera-based QR code scanning
- Manual form entry option
- Success confirmation
- Uses `html5-qrcode` library

### 2. Menu Page
- Three gradient tiles with icons
- Each tile navigates to a list page
- User welcome message
- Logout button

### 3. Content List Pages (Lectures, Seminars, Hands-On)
- Card-based layout
- Event details (title, description, instructor, date, duration)
- Register button for each event
- Loading and empty states
- Back button navigation

## 📊 Mock Data

The app includes sample data for:
- **4 Lectures**: React, JavaScript, Performance, CSS
- **4 Seminars**: Web Trends, Scalability, Security, AI/ML
- **5 Hands-On Sessions**: Todo App, REST API, Database, AWS, Testing

Located in: `src/services/mockApi.js`

### Adding More Mock Data
Edit the arrays in `mockApi.js`:
```javascript
const mockLectures = [
  {
    id: 'LEC001',
    title: 'Your Lecture',
    description: 'Description',
    instructor: 'Instructor Name',
    date: '2026-07-15',
    duration: '2 hours',
    level: 'Beginner'
  },
  // ... more items
]
```

## 🔌 Backend Integration

To use a real backend:

1. **Install Axios** (already included):
   ```bash
   npm install axios
   ```

2. **Update mockApi.js**:
   ```javascript
   import axios from 'axios'

   export const api = {
     async getLectures() {
       const response = await axios.get('/api/lectures')
       return response.data
     }
   }
   ```

3. **Update your .env**:
   ```
   VITE_API_URL=https://your-api.com
   ```

4. **Use in components**:
   ```javascript
   const response = await mockApi.getLectures()
   // or with backend:
   const response = await api.getLectures()
   ```

## 🎯 Available Scripts

```bash
# Development server (auto-reload)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Clean install (if needed)
npm install --legacy-peer-deps
```

## 🛠️ Styling

- **Framework**: Plain CSS
- **Primary Color**: LINE Green (#00b900)
- **Layouts**: CSS Grid & Flexbox
- **Responsive**: Mobile-first design
- **Hover Effects**: Smooth transitions

### Customizing Colors
Edit the CSS files to change colors:
```css
/* Line green */
background-color: #00b900;

/* Gradients for tiles */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Safari (iOS 12+)
- Firefox (latest)
- LINE In-App Browser

## 🐛 Debugging

### Check LIFF Status
Open browser console and run:
```javascript
liff.isLoggedIn()  // true/false
liff.getProfile()  // user profile
```

### Enable Error Logging
The app logs errors to console:
```javascript
console.error('Error:', error)  // Check browser dev tools
```

### Common Issues

**QR Camera Not Working**
- Check browser permissions
- Use HTTPS in production
- Ensure camera access is allowed

**LIFF Not Initializing**
- Verify LIFF ID is correct
- Check LINE Console configuration
- May not work outside LINE app

**Dependencies Error**
- Use `--legacy-peer-deps` flag
- Delete `node_modules` and `package-lock.json`
- Run `npm install --legacy-peer-deps` again

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | UI framework |
| react-dom | ^18.2.0 | DOM rendering |
| react-router-dom | ^6.20.0 | Routing |
| @line/liff | ^2.21.0 | LINE LIFF SDK |
| html5-qrcode | ^2.3.8 | QR scanning |
| axios | ^1.6.0 | HTTP requests |
| vite | ^5.0.0 | Build tool |

## 🚢 Deployment

### Deploy to Vercel
```bash
npm run build
# Upload dist/ folder to Vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

### Deploy to AWS/GCP
```bash
npm run build
# Upload dist/ to your cloud storage
```

### Push to LINE LIFF
1. Build the app: `npm run build`
2. Deploy dist/ folder to your web server
3. Set endpoint URL in LINE Console: `https://your-domain.com`
4. Test in LINE app

## 📚 Resources

- [LINE LIFF Docs](https://developers.line.biz/en/docs/liff/)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [React Router Docs](https://reactrouter.com/)

## 💡 Tips

1. **State Management**: For more complex apps, consider Redux or Zustand
2. **API Calls**: Wrap axios calls with error handling
3. **Forms**: Use libraries like React Hook Form for complex forms
4. **Testing**: Add Jest and React Testing Library
5. **Env Variables**: Use `.env` files for sensitive data

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT

---

**Need help?** Check the [LINE Developer Documentation](https://developers.line.biz/)
