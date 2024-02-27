require('dotenv').config()
const express = require("express")
const article = require("../models/FormModel")
const articleContent = require("../models/ContentModel")
const User = require("../models/User")
const UserMiddleware = require("../middleware/UserMiddleware")
const FormRoute = express.Router()
const bcrypt = require("bcryptjs")
const razorpay = require("razorpay")
// const { hmac_sha256 } = require('crypto-js');
const crypto = require('crypto');


// Form category logic
FormRoute.route("/category").post(async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        //    res.status(200).json("data successfully passed")
        const { category, language, length } = req.body
        if (!category || !language || !length) {
            return res.status(400).json("All fields are required")
        }
        const createForm = await article.create({ category, language, length })
        res.status(200).json({
            message: "Data received successfully!",
            id: createForm._id.toString()
        });
    } catch (error) {
        console.log(error)
    }


})
//  article content saved 
FormRoute.route("/content").post(async (req, res) => {
    try {
        const { content, title } = req.body

        const createContent = new articleContent({ content, title })
        await createContent.save()
        res.status(200).json({
            message: "content received successfully", createContent
        })
    } catch (error) {
        console.log("error fetching content")
        res.status(500).json({ error: "Error saving content to database" });
    }

})
//  user registration logic
FormRoute.route("/register").post(async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        const { username, email, phone, password } = req.body;

        if (!username || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }

        //hash the password
        const saltRound = 10
        const hash_password = await bcrypt.hash(password, saltRound)

        const createUser = await User.create({ username, email, phone, password: hash_password })
        res.status(200).json({
            message: "registration successfull",
            userId: createUser._id.toString(),
            token: createUser.generateToken()
        })
    } catch (error) {
        console.log(error)
    }
})
// user login logic
FormRoute.route("/login").post(async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExists = await User.findOne({ email: email });
        if (!userExists) {
            res.status(400).json({ message: "invalid credential" })
        }
        const isValidPassword = userExists.comparePassword(password)
        if (isValidPassword) {
            res.status(200).json({
                message: "login successfully",
                token: await userExists.generateToken(),
                userId: userExists._id.toString()
            })
        } else {
            res.status(401).json({ message: "invalid email or password" })
        }
    } catch (error) {
        console.log(error)
    }
})
// get logged in user data
FormRoute.route("/user").get(UserMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        console.log("user data ", userData)
        res.status(200).json({ userData })
        // res.status(200).json({msg : "hii user"})
    } catch (error) {
        console.log("error fetching user data ", error)
        res.status(500).json({ error: "Internal server error" });
    }
})
//count button click event
FormRoute.route("/search").post(UserMiddleware, async (req, res) => {
    try {
        req.user.clickCount = (req.user.clickCount || 0) + 1;
        await req.user.save();
        if (req.user.clickCount >= 20) {
            res.status(401).json({ message: "your search limit exceeded! please upgrade your plan" })
        }
        res.status(200).json({ clickCount: req.user.clickCount })
    } catch (error) {
        console.log("Error while counting button click", error)
    }
})

// payment methos

const instance = new razorpay({
    key_id: process.env.Key_Id,
    key_secret: process.env.Key_Secret,
});

FormRoute.route('/verify').post(async (req, res) => {
    try {
        const options = {
            amount: req.body.amount * 100, // amount in the smallest currency unit
            currency: "INR",
        };
        const order = await instance.orders.create(options)
        console.log("order created: ", order)
        res.status(200).json(order)
    } catch (error) {
        console.log("error creating order", error)
        res.status(500).json({ error: "Failed to create order" });
    }
})
// payment verfication logic
FormRoute.route("/paymentVerification").post(async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
        
        // Concatenate order_id and razorpay_payment_id for HMAC hashing
        const dataToHash = `${razorpay_order_id}|${razorpay_payment_id}`;

        const generated_signature = crypto.createHmac('sha256', process.env.Key_Secret).update(dataToHash).digest("hex")

        // Compare generated signature with Razorpay signature
        if (generated_signature == razorpay_signature) {
            console.log("Payement verfication successfull")
            res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)
        } else {
            console.log("Signature mismatch, payment verification failed");
        }
        console.log("Received signature:", razorpay_signature )
        console.log("Generated signature:", generated_signature)
    } catch (error) {
        console.log("error in payment verification ", error)
        res.status(500).json({ error: "Payment verification failed" });
    }
})
module.exports = FormRoute