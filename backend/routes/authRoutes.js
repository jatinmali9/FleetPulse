const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Profile = require("../models/Profile");

// ==========================
// REGISTER
// ==========================
router.post("/register", async (req, res) => {

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

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Create User
        const user = await User.create({
            name,
            email,
            password,
            phone,
            role,
            company,
            address
        });

        // Create Profile
        const nameParts = (name || "").trim().split(" ");

        const profile = await Profile.create({
            userId: user._id,
            userType: "User",
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" "),
            email: email,
            phone: phone
        });

        // Generate Token
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(201).json({

            success: true,

            message: "Registration Successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                company: user.company,
                address: user.address
            },

            profile

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

}); 
// ==========================
// LOGIN
// ==========================
router.post("/login", async (req, res) => {

    try {

        const { email, phone, password } = req.body;

        if (!password || (!email && !phone)) {
            return res.status(400).json({
                success: false,
                message: "Email (or Phone) and Password are required."
            });
        }

        let user = null;

        if (email) {
            user = await User.findOne({ email }).select("+password");
        } else {
            user = await User.findOne({ phone }).select("+password");
        }

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const profile = await Profile.findOne({ userId: user._id });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // DEBUG
        console.log("========== LOGIN ==========");
        console.log(user);
        console.log("===========================");

        res.status(200).json({
            success: true,
            token,

            // IMPORTANT:
            // Return ALL fields required by profile.html
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                company: user.company,
                address: user.address
            },

            profile
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;