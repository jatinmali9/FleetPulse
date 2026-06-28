require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function main() {
  const [,, email, newPassword] = process.argv;

  if (!email || !newPassword) {
    console.error('Usage: node resetPassword.js <email> <newPassword>');
    process.exit(1);
  }

  try {
    // reuse app's DB connection helper which sets DNS servers for Atlas
    const connectDB = require('../config/db');
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      console.error('User not found:', email);
      process.exit(2);
    }

    user.password = newPassword; // User pre-save hook will hash
    await user.save();

    console.log(`Password updated for ${email}`);
    process.exit(0);
  } catch (err) {
    console.error('Error updating password:', err.message || err);
    process.exit(3);
  }
}

main();
