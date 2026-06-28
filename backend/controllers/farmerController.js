const Farmer = require('../models/Farmer');

exports.add = async (req, res) => {
  try {
    const farmer = await Farmer.create(req.body);
    res.status(201).json({ success: true, message: 'Farmer registered successfully', data: farmer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const farmers = await Farmer.find().sort({ createdAt: -1 });
    res.set('Cache-Control', 'no-store');
    res.json(farmers);
  } catch (err) {
    console.error('Error fetching farmers:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const farmer = await Farmer.findByIdAndDelete(req.params.id);
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });
    res.json({ message: 'Farmer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
