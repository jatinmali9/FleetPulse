const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const User = require("../models/User");

// =====================================
// GET LOGGED-IN USER PROFILE
// GET /api/profile/my/profile
// =====================================

router.get("/my/profile", protect, async (req, res) => {

    try {

        const user = await User.findById(req.user._id)
            .select("-password");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        res.status(200).json({

            success: true,

            data: user

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

});


// =====================================
// UPDATE LOGGED-IN USER PROFILE
// PUT /api/profile/my/profile
// =====================================

router.put("/my/profile", protect, async (req, res) => {

    try {

        const {

            name,
            phone,
            company,
            address,
            profileImage

        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        user.name = name ?? user.name;
        user.phone = phone ?? user.phone;
        user.company = company ?? user.company;
        user.address = address ?? user.address;
        user.profileImage = profileImage ?? user.profileImage;

        await user.save();

        res.status(200).json({

            success: true,

            message: "Profile Updated Successfully",

            data: {

                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                company: user.company,
                address: user.address,
                profileImage: user.profileImage

            }

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

});

module.exports = router;