const mongoose = require("mongoose")

const SubscriptionSchema = new mongoose.Schema({
    emailId: {
        type: String,
        require: true
    },
    subscriptionId: {
        type: String,
        require: true,
    },
    planId: {
        type: String,
    },
    paymentId :{
        type : String
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

const Subscription = mongoose.model("Subscription ", SubscriptionSchema)
module.exports = Subscription;