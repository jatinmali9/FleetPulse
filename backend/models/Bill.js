const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  number: Number,
  date: String,
  farmer: String,
  village: String,
  buyer: String,
  items: Array,
  totalJaali: Number,
  totalAmount: Number,
  commission: Number,
  expenses: Number,
  finalAmount: Number
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);