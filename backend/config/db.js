const dns = require('dns');
// Use public DNS servers for SRV lookup when local DNS refuses MongoDB SRV queries.
// This fixes Node.js querySrv ECONNREFUSED for Atlas connection strings on some Windows systems.
dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

const mongoose = require('mongoose');

const DEFAULT_MONGO_URI = 'mongodb://127.0.0.1:27017/fleetpulse';

const resolveMongoUri = () => {
  const configured = process.env.MONGO_URI && process.env.MONGO_URI.trim();
  return configured || DEFAULT_MONGO_URI;
};

const connectDB = async () => {
  const mongoUri = resolveMongoUri();

  try {
    const conn = await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn(`MongoDB connection failed: ${err.message}`);
    console.warn('Continuing without a database connection. Set MONGO_URI in backend/.env to a working MongoDB instance.');
  }
};

module.exports = { connectDB, resolveMongoUri };