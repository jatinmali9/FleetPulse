const express = require("express");
const router = express.Router();

const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");
const Trip = require("../models/Trip");
const Maintenance = require("../models/Maintenance");

router.get("/", async (req, res) => {

    try {

        const totalVehicles = await Vehicle.countDocuments();

        const totalDrivers = await Driver.countDocuments();

        const totalTrips = await Trip.countDocuments();

        const maintenanceDue = await Maintenance.countDocuments({
            status: "Pending"
        });

        // Monthly Trips
        const monthlyTrips = [];

        for (let month = 0; month < 12; month++) {

            const start = new Date(2026, month, 1);
            const end = new Date(2026, month + 1, 1);

            const count = await Trip.countDocuments({
                createdAt: {
                    $gte: start,
                    $lt: end
                }
            });

            monthlyTrips.push(count);
        }

        // Recent Trips
        const recentTrips = await Trip.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("vehicle")
            .populate("driver");

        const activities = recentTrips.map(trip => ({
            vehicle: trip.vehicle?.vehicleNumber || "N/A",
            driver: trip.driver?.name || "N/A",
            status: trip.status || "Completed",
            date: trip.createdAt.toISOString().split("T")[0]
        }));

        res.json({
            totalVehicles,
            totalDrivers,
            totalTrips,
            maintenanceDue,
            monthlyTrips,
            activities
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Dashboard Error"
        });

    }

});

module.exports = router;
