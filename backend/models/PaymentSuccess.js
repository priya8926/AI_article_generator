const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
    razorpay_subscription_id: {
        type: String,
        require: true
    },
    razorpay_payment_id: {
        type: String,
        require: true
    },
    razorpay_signature: {
        type: String,
        require: true
    },
    createdAt : {
        type : Date,
        default : Date.now,
    }
})

const payment = mongoose.model("payment", paymentSchema)
module.exports = payment;