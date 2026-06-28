const dns = require('dns');
// Use public DNS servers for SRV lookup when local DNS refuses MongoDB SRV queries.
// This fixes Node.js querySrv ECONNREFUSED for Atlas connection strings on some Windows systems.
dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;