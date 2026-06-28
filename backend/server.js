require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const { connectDB } = require('./config/db');     // ✅ DB
const billRoutes = require('./routes/billRoutes'); // controller-backed
const farmerRoutes = require('./routes/farmerRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const driverRoutes = require('./routes/driverRoutes');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const profileRoutes = require('./routes/profileRoutes');
const { protect } = require('./middleware/auth');

const app = express();

// 🔥 connect DB
connectDB();

// 🔥 middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));

const publicFrontendPaths = new Set(['/', '/index.html', '/sign-in.html', '/sign-up.html']);

app.use((req, res, next) => {
  const pathname = req.path.toLowerCase();

  if (pathname.startsWith('/api')) {
    return next();
  }

  if (publicFrontendPaths.has(pathname)) {
    return next();
  }

  if (pathname.endsWith('.html')) {
    return protect(req, res, next);
  }

  return next();
});

// Serve compiled frontend pages and assets
app.use(express.static(path.join(__dirname, '..', 'frontend', 'pages')));
app.use('/assets', express.static(path.join(__dirname, '..', 'frontend', 'assets')));

// 🔥 Serve index.html for root path (SPA support)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'pages', 'index.html'));
});

// 🔥 auth routes
app.use('/api/auth', authRoutes);
app.use('/', authRoutes); // legacy frontend support for /register and /login

// 🔥 protect all other API routes
app.use('/api', protect);

// 🔥 routes
app.use('/api/bill', billRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/profile', profileRoutes);

// 🔥 start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`, `http://localhost:${PORT}`);
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the running process or change PORT in .env.`);
    process.exit(1);
  }
  throw err;
});