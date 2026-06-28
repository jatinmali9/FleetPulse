# Deployment Guide

Deploy FleetPulse to Render, Railway, Vercel, or Netlify. Each platform has a config file in the root directory.

## Render (Recommended - Free Tier Available)

### Setup via Render Dashboard

1. Go to [render.com](https://render.com)
2. Sign up with GitHub/email
3. Click **New +** → **Web Service**
4. Connect your GitHub repository
5. **Render automatically detects `render.yaml`** and uses those settings:
   - Build command: `cd backend && npm install`
   - Start command: `cd backend && npm start`
   - Root directory: `.` (auto-detects backend subdirectory)

### Environment Variables

In Render Dashboard → **Environment**:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fleetpulse
JWT_SECRET=your_random_secret_key_here
NODE_ENV=production
PORT=5000
```

### Deploy

Push to GitHub → Render auto-deploys on `main` branch changes.

**URL:** `https://fleetpulse.onrender.com`

---

## Railway (Simple & Fast)

### Setup via Railway Dashboard

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your FleetPulse repo
5. **Railway auto-detects `railway.json`** and configures accordingly

### Environment Variables

In Railway Dashboard → **Variables**:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fleetpulse
JWT_SECRET=your_random_secret_key_here
NODE_ENV=production
```

### Deploy

The deployment starts automatically after connecting your repo.

**Cost:** $5/month minimum (includes free allowance for first month)

---

## Vercel (API Only - Split Deployment)

Use Vercel **only for API endpoints** if you prefer serverless.

### Setup via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **Import Project** → select your GitHub repo
4. **Vercel auto-detects `vercel.json`**
5. Root directory: `backend`

### Environment Variables

In Vercel Dashboard → **Settings → Environment Variables**:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fleetpulse
JWT_SECRET=your_random_secret_key_here
NODE_ENV=production
```

### Deploy

Push to GitHub → Vercel auto-deploys.

**API URL:** `https://fleetpulse.vercel.app/api/*`

### Frontend Deployment (Separate)

If using Vercel for API, deploy frontend to **Netlify** (see below) and update API calls in `frontend/assets/js/apiClient.js`:

```javascript
window.__API_BASE__ = 'https://fleetpulse.vercel.app/api';
```

---

## Netlify (Frontend Only)

Use Netlify **only for frontend** if you have a separate API server (e.g., Render/Railway).

### Setup via Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click **New site from Git** → select your GitHub repo
4. **Netlify auto-detects `netlify.toml`** and uses those settings:
   - Publish directory: `frontend/pages`
   - Build command: none (static files)

### Deploy

Push to GitHub → Netlify auto-deploys frontend.

**Frontend URL:** `https://fleetpulse-app.netlify.app`

### API Configuration

Update API base in `frontend/assets/js/apiClient.js` to point to your backend:

```javascript
window.__API_BASE__ = 'https://fleetpulse.onrender.com/api'; // or Railway/Vercel URL
```

---

## Split Deployment (Recommended for Production)

**Best practice:** Run backend and frontend separately for flexibility.

| Service | What | URL |
|---------|------|-----|
| **Render** (or Railway) | Backend API | `https://fleetpulse.onrender.com` |
| **Netlify** (or Vercel) | Frontend pages | `https://fleetpulse-app.netlify.app` |

**Configuration:**
1. Deploy backend to Render: backend runs at root path
2. Deploy frontend to Netlify: static files at root
3. Update `frontend/assets/js/apiClient.js` with backend URL

---

## Full Stack Deployment (Single Server)

**Simpler:** Render/Railway runs both backend API and frontend from one server.

**Frontend served from:**
- Backend serves `/` → `frontend/pages/*` (HTML pages)
- Backend serves `/assets/*` → `frontend/assets/*` (CSS/JS/images)
- Backend handles `/api/*` → API routes

**Configuration:**
1. Deploy entire project to Render or Railway
2. Both run `cd backend && npm start`
3. Server automatically serves frontend files

---

## Troubleshooting

### API calls returning 404

**Cause:** Frontend using wrong API base URL.

**Fix:** Ensure `apiClient.js` points to correct server:
```javascript
// In frontend/assets/js/apiClient.js
const base = window.__API_BASE__ || '/api';
```

### CORS errors

**Cause:** API server not configured for frontend origin.

**Fix:** Backend `server.js` already has:
```javascript
app.use(cors());
```

Ensure it's not restricted to specific origins.

### MongoDB connection failed

**Cause:** IP not whitelisted in MongoDB Atlas.

**Fix:**
1. Go to MongoDB Atlas → Network Access
2. Add `0.0.0.0/0` for testing (less secure)
3. Or add deployment server IP specifically

### Port already in use

**Cause:** Another process using port 5000.

**Fix:** Change `PORT` environment variable in deployment config.

---

## Local Testing Before Deployment

```bash
# Test with production settings
cd backend
NODE_ENV=production npm start

# Frontend should be accessible at http://localhost:5000
# API should be accessible at http://localhost:5000/api/*
```

---

## Environment-Specific Configuration

### Development (.env)
```env
MONGO_URI=mongodb://localhost:27017/fleetpulse
JWT_SECRET=dev_secret_key_do_not_use_in_production
NODE_ENV=development
PORT=5000
```

### Production (Render/Railway/Vercel .env)
```env
MONGO_URI=mongodb+srv://prod_user:prod_password@cluster.mongodb.net/fleetpulse
JWT_SECRET=long_random_secure_secret_key_change_regularly
NODE_ENV=production
PORT=5000
```

---

## Monitoring & Logs

- **Render:** Dashboard → Logs tab
- **Railway:** Dashboard → Logs tab
- **Vercel:** Dashboard → Deployments → Overview
- **Netlify:** Dashboard → Deploys → Deploy log

Check logs if deployment fails or API returns errors.

---

## Questions?

Refer to official docs:
- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
