const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
    subscriptionId: {
        type: String,
        require: true
    },
    paymentId: {
        type: String,
        require: true,
        unique: true
    },
    emailId: {
        type: String,
        require: true
    },
    planId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Payment = mongoose.model("Payment ", paymentSchema)
module.exports = Payment;