const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    name: String,

    phone: {
        type: String,
        unique: true
    },

    openingBalance: Number,

    balanceType: String,

    partyType: String,

    gstin: String,

    address: String

}, { timestamps: true });

module.exports =
    mongoose.model(
        "Customer",
        customerSchema
    );