const Transaction = require('../models/Transaction');

exports.addEntry = async (req, res) => {
  try {
    const { customerId, amount, type, details } = req.body;
    const last = await Transaction.findOne({ customerId }).sort({ createdAt: -1 });
    let currentBalance = last ? last.balance : 0;
    if (type === 'gave') currentBalance += Number(amount); else currentBalance -= Number(amount);
    const transaction = await Transaction.create({ customerId, amount, type, details, balance: currentBalance });
    res.json({ success: true, transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getByCustomer = async (req, res) => {
  try {
    const transactions = await Transaction.find({ customerId: req.params.customerId }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
