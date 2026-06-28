const express = require('express');
const router = express.Router();

const Customer =
    require('../models/Customer');


// ================= ADD CUSTOMER =================
// ================= ADD CUSTOMER =================
router.post('/add', async (req, res) => {

    try {

        const {

            name,
            phone,
            openingBalance,
            balanceType,
            partyType,
            gstin,
            address

        } = req.body;



        // DUPLICATE PHONE
        const exists =
            await Customer.findOne({ phone });

        if (exists) {

            return res.status(400).json({

                message:"Phone already exists"
            });
        }



        // ================= INITIAL TOTALS =================
        let totalGive = 0;
        let totalGet = 0;



        if (balanceType === "gave") {

            totalGive =
                Number(openingBalance || 0);

        } else {

            totalGet =
                Number(openingBalance || 0);
        }



        // ================= SAVE =================
        const customer =
            await Customer.create({

                name,
                phone,
                openingBalance,
                balanceType,
                partyType,
                gstin,
                address,

                totalGive,
                totalGet
            });



        res.json({

            success:true,
            customer
        });

    } catch(err) {

        console.error(err);

        res.status(500).json({

            message:err.message
        });
    }
}); 

// ================= GET CUSTOMERS =================
router.get('/all', async (req, res) => {

    try {

        const customers =
            await Customer.find()
            .sort({ createdAt:-1 });

        res.json(customers);

    } catch(err) {

        res.status(500).json({

            message:err.message
        });
    }
});


// ================= GET SINGLE CUSTOMER =================
router.get('/:id', async (req, res) => {

    try {

        const customer =
            await Customer.findById(
                req.params.id
            );

        if (!customer) {

            return res.status(404).json({

                message: "Customer not found"
            });
        }

        res.json(customer);

    } catch(err) {

        console.error(err);

        res.status(500).json({

            message: err.message
        });
    }
});

module.exports = router;