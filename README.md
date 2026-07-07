# LINE LIFF App - Lectures & Seminars Platform

A modern LINE Front-end Framework (LIFF) application built with React that allows users to:
- Register as friends by scanning QR codes
- View available lectures, seminars, and hands-on sessions
- Register for events from a beautiful tile-based menu interface

## Project Structure

```
├── public/
│   └── index.html           # Main HTML file with LIFF SDK
├── src/
│   ├── pages/               # Page components
│   │   ├── QRRegistration.jsx    # QR code scanner and registration
│   │   ├── Menu.jsx              # Main menu with three tiles
│   │   ├── LecturesList.jsx      # Lectures listing
│   │   ├── SeminarsList.jsx      # Seminars listing
│   │   └── HandsOnList.jsx       # Hands-on sessions listing
│   ├── services/            # API services
│   │   └── mockApi.js       # Mock backend API
│   ├── styles/              # CSS stylesheets
│   ├── App.jsx              # Main app component
│   ├── App.css
│   ├── index.css
│   └── main.jsx             # Entry point
├── package.json
├── vite.config.js
└── README.md
```

## Features

### 1. QR Code Registration
- Scan QR code with camera to register as friend
- Manual entry option for user details
- Form validation before registration

### 2. Main Menu
- Three tile interface with icons
- Lectures (📚)
- Seminars (🎤)
- Hands-On Sessions (🛠️)
- User welcome message
- Logout functionality

### 3. Content Lists
- Beautiful card-based layout
- Events with details: title, description, instructor/speaker, date, duration
- Registration buttons
- Loading states
- Empty states

### 4. Mock Backend
- 4 sample lectures
- 4 sample seminars
- 5 sample hands-on sessions
- Simulated API delays for realism

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Install dependencies:
```bash
npm install
```

2. **Important: Configure LIFF ID**
   - Open `src/App.jsx`
   - Replace `YOUR_LIFF_ID_HERE` with your actual LIFF ID from LINE Console
   ```javascript
   await liff.init({ liffId: 'YOUR_LIFF_ID_HERE' })
   ```

3. For development, the app works without a LIFF ID (falls back to mock mode)

### Development

Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Building for Production

Build the project:
```bash
npm run build
```

Preview the build:
```bash
npm run preview
```

## LINE LIFF Setup

✅ **CONFIGURED** with your LIFF credentials:
- **LIFF App Name**: Test-LIFF-APP
- **LIFF ID**: 2010634921-Np2YO0dP
- **LIFF URL**: https://liff.line.me/2010634921-Np2YO0dP

To use this LIFF app:
1. Get your deployed app URL from LINE Console
2. Update the endpoint URL in LINE Console to your deployed app URL
3. The LIFF ID is already configured in `src/App.jsx`

## API Implementation

The app currently uses mock data. To integrate with a real backend:

1. Update `src/services/mockApi.js` with actual API calls using axios
2. Replace mock data endpoints with your backend URLs
3. Update error handling as needed

Example:
```javascript
export const mockApi = {
  async getLectures() {
    // Replace with actual API call
    const response = await axios.get('https://your-api.com/api/lectures')
    return response.data
  }
}
```

## User Flow

1. **User opens app** → Shown QR registration page
2. **User scans QR or enters details** → Registers as friend
3. **Registration successful** → Redirected to menu
4. **User selects a tile** → Shown list of that category
5. **User can register for events** → Shows confirmation
6. **User can logout** → Returns to registration page

## Dependencies

- **React** (v18.2.0) - UI framework
- **React Router DOM** (v6.20.0) - Client-side routing
- **@line/liff** (v2.21.0) - LINE LIFF SDK
- **html5-qrcode** (v2.3.8) - QR code scanning
- **qrcode.react** (v1.0.1) - QR code generation (optional, for future use)
- **axios** (v1.6.0) - HTTP client (for backend integration)
- **Vite** (v5.0.0) - Build tool

## Styling

The app uses plain CSS with:
- CSS Grid and Flexbox for layouts
- CSS animations for loading states
- Responsive design for mobile devices
- LINE green (#00b900) as primary color

## Browser Support

- Chrome/Edge (latest)
- Safari (iOS 12+)
- Firefox (latest)

## Notes

- User data is stored in localStorage during the session
- The app clears user data on logout
- All event registration is simulated with mock data
- Ready for backend integration

## Future Enhancements

- [ ] Real backend API integration
- [ ] User profile page
- [ ] Event booking confirmation
- [ ] Push notifications via LINE
- [ ] User calendar view
- [ ] Search and filter events
- [ ] Event details page
- [ ] User registrations history

## License

MIT

## Support

For issues or questions, please check the LINE LIFF documentation:
https://developers.line.biz/en/docs/liff/
