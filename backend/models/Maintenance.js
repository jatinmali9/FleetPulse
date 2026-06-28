const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  type: { type: String, required: true }, // e.g., 'oil_change', 'tyre', 'inspection'
  description: { type: String },
  cost: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  shop: { type: String },
  nextDueKm: { type: Number },
  nextDueDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Maintenance', MaintenanceSchema);
