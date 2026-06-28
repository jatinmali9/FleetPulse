const express = require('express');
const router = express.Router();

const Bill = require('../models/Bill');
const Counter = require('../models/counterModel'); // ✅ IMPORTANT


// 🔥 SAVE BILL + GENERATE NUMBER
router.post('/save', async (req, res) => {
  try {

    // increment only on save
    const counter = await Counter.findOneAndUpdate(
      { name: 'invoice' },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    const invoiceNumber = counter.value;

    const bill = new Bill({
      ...req.body,
      number: invoiceNumber
    });

    await bill.save();

    res.json({
      message: "Bill saved successfully",
      number: invoiceNumber
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});
// 🔥 PREVIEW NEXT NUMBER (NO INCREMENT)
router.get('/next-number', async (req, res) => {
  try {
    const counter = await Counter.findOne({ name: 'invoice' });

    const nextNumber = (counter?.value || 0) + 1;

    res.json({ number: nextNumber });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/all', async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });

    res.json(bills);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔥 GET SINGLE BILL
router.get('/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔥 UPDATE BILL
router.put('/:id', async (req, res) => {
  try {
    const updated = await Bill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔥 DELETE BILL
router.delete('/:id', async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.json({ message: "Bill deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;