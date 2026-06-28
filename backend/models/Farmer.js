const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address: String,
  location: String,
  product: String,
  category: String
}, { timestamps: true });

module.exports = mongoose.model('Farmer', farmerSchema);