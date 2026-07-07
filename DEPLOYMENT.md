# 🚀 LINE LIFF App Deployment Guide

## Your LIFF Configuration

✅ **LIFF App Name**: Test-LIFF-APP  
✅ **LIFF ID**: `2010634921-Np2YO0dP`  
✅ **Endpoint URL Pattern**: `https://your-deployed-url`

---

## ⚡ Quick Start - Deploy to Vercel (Recommended)

### Step 1: Push to GitHub
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "LINE LIFF App with Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/line-liff-app.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub (select your repo)
4. Click "Deploy"
5. Your app will be live in ~30 seconds! 🎉

**You'll get a URL like**: `https://line-liff-app.vercel.app`

---

## 📝 Update LINE Console

Once you have your deployed URL (e.g., `https://line-liff-app.vercel.app`):

1. Go to [LINE Console](https://console.line.biz/)
2. Select your Provider → Channel
3. Go to LIFF section
4. Find "Test-LIFF-APP"
5. Update **Endpoint URL**: 
   - Set to: `https://line-liff-app.vercel.app`
   - **OR** your actual deployed URL
6. Save changes

---

## 🌐 Alternative Deployment Options

### Option A: Netlify (Drag & Drop)
```bash
npm run build
# Upload the 'dist' folder to https://app.netlify.com/drop
```
**Result**: Your app is live in minutes!

### Option B: AWS Amplify
```bash
npm install -g @aws-amplify/cli
amplify init
amplify publish
```

### Option C: GitHub Pages
```bash
# Add to package.json
"homepage": "https://YOUR_USERNAME.github.io/line-liff-app"

# Deploy
npm run build
npx ghpages -d dist
```

---

## 🔧 Local Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm run dev

# Access at: http://localhost:3000
```

---

## 📦 Production Build

```bash
# Build for production
npm run build

# Output is in 'dist/' folder
# Ready to deploy anywhere!
```

---

## ✅ Test Your LIFF App

### In LINE Official Account
1. Open your LINE bot
2. You should see your LIFF app button
3. Click to open → Your app loads!

### Testing URLs
- **Dev**: `http://localhost:3000`
- **Production**: Your Vercel/Netlify URL
- **LIFF Link**: `https://liff.line.me/2010634921-Np2YO0dP`

---

## 🔐 Environment Variables

**Local** (`.env`):
```
VITE_LIFF_ID=2010634921-Np2YO0dP
```

**Production** (Vercel):
1. Go to Project Settings
2. Environment Variables
3. Add: `VITE_LIFF_ID=2010634921-Np2YO0dP`

---

## 🎯 Features Ready

- ✅ QR Code Registration (with fallback form)
- ✅ Three-Tile Menu (Lectures, Seminars, Hands-On)
- ✅ Mock Backend Data (4 Lectures, 4 Seminars, 5 Hands-On)
- ✅ User Session Management
- ✅ LINE LIFF Integration
- ✅ Production-Ready Build

---

## 📊 Project Structure

```
dist/                    # Production build (ready to deploy)
├── index.html          # Main HTML
├── assets/             # CSS + JS bundles
└── favicon.ico         # Icon

src/
├── pages/              # React components
├── services/           # Mock API
├── styles/             # CSS files
└── App.jsx             # Main app (LIFF configured)
```

---

## 🆘 Troubleshooting

### LIFF Not Loading
- ✅ Check LIFF ID is correct: `2010634921-Np2YO0dP`
- ✅ Check endpoint URL is updated in LINE Console
- ✅ HTTPS required (Vercel/Netlify provide this)

### Build Failing
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### Port 3000 Already In Use
```bash
npm run dev -- --port 3001
```

---

## 📞 Support

- [LINE LIFF Docs](https://developers.line.biz/en/docs/liff/)
- [Vercel Deploy Docs](https://vercel.com/docs)
- [React Router Docs](https://reactrouter.com/)

---

**Your app is ready to deploy! 🚀**

Next steps:
1. Choose a deployment platform (Vercel recommended)
2. Get your public URL
3. Update it in LINE Console
4. Test with your LINE bot!
