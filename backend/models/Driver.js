const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address: String,
  license: String,
  licenseExpiry: Date,
  vehicle: String,
  basePay: { type: Number, default: 0 },
  trips: { type: Number, default: 0 },
  ratePerTrip: { type: Number, default: 0 },
  totalPay: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Driver', DriverSchema);
