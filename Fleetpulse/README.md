# FleetPulse

Production-ready Fleet Management system with Express backend and static HTML frontend.

**Tech Stack:**
- Backend: Node.js + Express + MongoDB (Mongoose)
- Frontend: Static HTML/CSS/JavaScript with Tailwind CSS
- Authentication: JWT-based with bcryptjs hashing

## Project Structure

```
FleetPulse/
├── backend/                    # Express API server
│   ├── config/                # Database configuration
│   ├── controllers/           # Business logic for each domain
│   ├── middleware/            # Auth & custom middleware
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API endpoint definitions
│   ├── services/              # Utility services
│   ├── validations/           # Input validation logic
│   ├── uploads/               # File upload storage
│   ├── scripts/               # Utility scripts (password reset)
│   ├── .env.example           # Environment template
│   ├── server.js              # Express app entry point
│   └── package.json           # Backend dependencies
│
├── frontend/                   # Static frontend files
│   ├── pages/                 # HTML pages (served from /)
│   │   ├── index.html         # Homepage
│   │   ├── Dashboard.html     # Main app dashboard
│   │   ├── sign-in.html       # Login page
│   │   ├── sign-up.html       # Registration page
│   │   └── [20+ other pages]
│   │
│   └── assets/                # Static assets
│       ├── js/                # JavaScript files
│       │   ├── apiClient.js   # Centralized API wrapper
│       │   └── dashboard.js   # Dashboard data fetching
│       ├── css/               # Stylesheets
│       └── images/            # Images & media
│
├── .gitignore                 # Git ignore rules
├── README.md                  # This file
└── DEPLOYMENT.md              # Detailed deployment guide
```

## Local Development

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or Atlas)

### Setup

```bash
# 1. Clone and install backend dependencies
cd backend
npm install

# 2. Create .env file from template
cp .env.example .env
# Edit .env and set:
#   - MONGO_URI=your_mongodb_connection_string
#   - JWT_SECRET=your_secret_key
#   - NODE_ENV=development

# 3. Start development server (from backend directory)
npm run dev
```

Server runs on `http://localhost:5000`. Frontend pages are served from root (`/`), API endpoints at `/api/*`, and assets from `/assets/*`.

### Scripts

- `npm run dev` - Start with nodemon (auto-restart on changes)
- `npm start` - Start production server
- `npm run reset-password` - Database password reset utility

## API Endpoints

**Auth:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and receive JWT

**Protected Endpoints (require JWT in Authorization header):**
- `GET/POST /api/bill/*` - Bill management
- `GET/POST /api/farmer/*` - Farmer data
- `GET/POST /api/vehicle/*` - Vehicle management
- `GET/POST /api/driver/*` - Driver management
- `GET/POST /api/customer/*` - Customer management
- `GET/POST /api/transaction/*` - Transaction records
- `GET/PUT /api/profile/my/profile` - User profile

## Deployment

This project is configured for easy deployment to multiple platforms:

| Platform | Config File | Cost | Setup Time |
|----------|------------|------|-----------|
| **Render** | `render.yaml` | Free tier available | 5 min |
| **Railway** | `railway.json` | $5/month minimum | 3 min |
| **Vercel** (API only) | `vercel.json` | Free tier available | 5 min |
| **Netlify** (Frontend only) | `netlify.toml` | Free tier available | 2 min |

**Quick Start:** See [DEPLOYMENT.md](./DEPLOYMENT.md) for platform-specific instructions.

## Environment Variables

Create `backend/.env` based on `backend/.env.example`:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fleetpulse

# JWT
JWT_SECRET=your_random_secret_key_here

# Environment
NODE_ENV=development
PORT=5000
```

## Frontend Authentication Flow

1. User navigates to `/sign-in.html`
2. Enters credentials → `POST /api/auth/login`
3. Receives JWT token → stored in localStorage
4. `apiClient.js` automatically injects token in all subsequent requests
5. Protected HTML pages check for valid token; unauthenticated users redirect to `/sign-in.html`

## Troubleshooting

**Port 5000 already in use:**
```bash
# Change port in .env
PORT=5001
```

**MongoDB connection failed:**
- Verify `MONGO_URI` in `.env`
- Check MongoDB Atlas IP whitelist includes your IP
- Ensure database user has permissions

**Frontend can't reach API:**
- Verify server is running: `curl http://localhost:5000`
- Check browser console for CORS errors
- Ensure requests use correct base URL (should be relative `/api/*` for local dev)

## Contributing

See `backend/README.md` for detailed backend documentation.

## License

MIT
