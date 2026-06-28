const Driver = require('../models/Driver');

exports.register = async (req, res) => {
  try {
    const { name, contact, address, license, licenseExpiry, vehicle, basePay, trips, ratePerTrip, totalPay } = req.body;
    if (!name || !contact) return res.status(400).json({ success: false, message: 'Name and contact are required.' });
    const driver = await Driver.create({ name, contact, address, license, licenseExpiry, vehicle, basePay, trips, ratePerTrip, totalPay });
    res.status(201).json({ success: true, message: 'Driver registered successfully', driver });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ createdAt: -1 });
    res.json(drivers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
