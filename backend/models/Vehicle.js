const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  vehicleNo: { type: String, required: true },
  driverName: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);