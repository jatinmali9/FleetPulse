const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

// =====================
// Generate JWT Token
// =====================
function sendToken(user, res) {

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d"
        }
    );

    // ================= DEBUG =================
    console.log("\n========== LOGIN USER ==========");
    console.log("ID      :", user._id);
    console.log("Name    :", user.name);
    console.log("Email   :", user.email);
    console.log("Phone   :", user.phone);
    console.log("Role    :", user.role);
    console.log("Company :", user.company);
    console.log("Address :", user.address);
    console.log("================================\n");

    res.status(200).json({

        token,

        user: {

            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            company: user.company,
            address: user.address

        }

    });

}

// =====================
// Register
// =====================
router.post(
    "/register",
    [
        body("name").notEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 6 })
    ],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        try {

            const {
                name,
                email,
                password,
                phone,
                role,
                company,
                address
            } = req.body;

            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    message: "User already exists"
                });
            }

            user = new User({
                name,
                email,
                password,
                phone,
                role,
                company,
                address
            });

            await user.save();

            sendToken(user, res);

        } catch (err) {

            console.log(err);

            res.status(500).json({
                message: "Server Error"
            });

        }

    }
);

// =====================
// Login
// =====================
router.post(
    "/login",
    [
        body("email").isEmail(),
        body("password").exists()
    ],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        try {

            const { email, password } = req.body;

            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return res.status(400).json({
                    message: "Invalid Credentials"
                });
            }

            const isMatch = await user.matchPassword(password);

            if (!isMatch) {
                return res.status(400).json({
                    message: "Invalid Credentials"
                });
            }

            sendToken(user, res);

        } catch (err) {

            console.log(err);

            res.status(500).json({
                message: "Server Error"
            });

        }

    }
);

module.exports = router;