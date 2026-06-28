const Vehicle = require('../models/Vehicle');

exports.add = async (req, res) => {
  try {
    const { vehicleNo, driverName, lat, lng } = req.body;
    if (!vehicleNo || !driverName || lat == null || lng == null) return res.status(400).json({ message: 'vehicleNo, driverName, lat, and lng are required.' });
    const vehicle = new Vehicle({ vehicleNo, driverName, lat, lng });
    await vehicle.save();
    res.status(201).json({ success: true, message: 'Vehicle saved successfully.', vehicle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await Vehicle.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
