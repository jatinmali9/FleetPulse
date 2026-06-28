const Customer = require('../models/Customer');
const Transaction = require('../models/Transaction');

exports.addCustomer = async (req, res) => {
  try {
    const { name, phone, openingBalance, balanceType, partyType, gstin, address } = req.body;
    const exists = await Customer.findOne({ phone });
    if (exists) return res.status(400).json({ message: 'Phone already exists' });
    let totalGive = 0, totalGet = 0;
    if (balanceType === 'gave') totalGive = Number(openingBalance || 0); else totalGet = Number(openingBalance || 0);
    const customer = await Customer.create({ name, phone, openingBalance, balanceType, partyType, gstin, address, totalGive, totalGet });
    res.json({ success: true, customer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
