const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },

    amount: Number,

    type: String, // gave / got

    details: String,

    balance: Number

}, { timestamps:true });

module.exports =
    mongoose.model(
        "Transaction",
        transactionSchema
    );