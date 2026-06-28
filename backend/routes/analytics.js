const express = require("express");
const router = express.Router();

const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");
const Trip = require("../models/Trip");

router.get("/", async (req, res) => {
    try {

        const totalVehicles = await Vehicle.countDocuments();

        const activeVehicles = await Vehicle.countDocuments({
            status: "Active"
        });

        const totalDrivers = await Driver.countDocuments();

        const activeTrips = await Trip.countDocuments({
            status: "Running"
        });

        res.json({
            totalVehicles,
            activeVehicles,
            totalDrivers,
            activeTrips
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;