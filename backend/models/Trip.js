const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startLocation: { type: String },
  endLocation: { type: String },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  distanceKm: { type: Number, default: 0 },
  fuelUsedLiter: { type: Number, default: 0 },
  notes: { type: String },
  status: { type: String, enum: ['planned','ongoing','completed','cancelled'], default: 'planned' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', TripSchema);
