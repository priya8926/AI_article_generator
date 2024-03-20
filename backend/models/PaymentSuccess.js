const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
    subscriptionId: {
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
        require: true
    },
    paymentId: {
        type: String,
        require: true,
        unique: true
    },
    createdAt: {
        type: String,
        default: () => new Date().toLocaleDateString('en-IN', {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: 'Asia/Kolkata',
        }),
    }
})

const Payment = mongoose.model("Payment ", paymentSchema)
module.exports = Payment;