require('dotenv').config()
const express = require("express")
const article = require("../models/FormModel")
const articleContent = require("../models/ContentModel")
const User = require("../models/User")
const { UserMiddleware } = require("../middleware/UserMiddleware")
const FormRoute = express.Router()
const bcrypt = require("bcryptjs")
const Razorpay = require("razorpay")
// const { hmac_sha256 } = require('crypto-js');
const crypto = require('crypto');
const Payment = require('../models/PaymentSuccess')
const { ObjectId } = require('mongodb');

// Form category logic
FormRoute.route("/category").post(UserMiddleware, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated." });
        }
        const data = req.body
        console.log(data)

        const { category, language, length, promptInput, title, content } = req.body

        // if (!promptInput) {
        //     console.log("promt input required")
        // // }
        // if (!category || !language || !length) {
        //     return res.status(400).json("All fields are required")
        // }
        const createForm = await article.create({ category, language, length, promptInput, userId: req.user._id, title, content })

        await createForm.save();
        if (!createForm) {
            res.status(500).json({ message: "failed to save data" })
        }
        res.status(200).json({
            message: "Data received successfully!",
            id: createForm._id.toString()
        });
    } catch (error) {
        console.log(error)
    }
})
FormRoute.route("/category/:id").get(UserMiddleware, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated." });
        }
        const id = req.params.id;
        const data = await article.findOne({ _id: id });
        res.status(200).json(data)
        // const { title, content } = req.body;

        // article.title = req.body.title;
        // article.content = req.body.content;

        // // Save the updated article
        // const updatedArticle = await article.save();

        // const updatedArticle = await article.findByIdAndUpdate(id, { title, content }, { new: true });

        // if (!updatedArticle) {
        //     return res.status(404).json({ message: "Category not found." });
        // }

        res.status(200).json({
            message: "id receive successfully!",
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
FormRoute.route('/updateArticle/:id').patch(UserMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const { title, content } = req.body
        const updatedArticle = await article.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ message: "Article not found." });
        }
        res.status(200).json({
            message: "update successfully",
            updatedArticle
        });
    } catch (error) {
        console.log(error)
    }
})

// get the catgory
FormRoute.route('/getCategory').get(UserMiddleware, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated." });
        }
        const useArticle = await article.find({ userId: req.user._id }, { category: 1, language: 1, length: 1, promptInput: 1 }).sort({ _id: -1 })

        if (!useArticle || useArticle.length === 0) {
            return res.status(404).json({ message: "No category found for this user." });
        }
        return res.status(200).json(useArticle)

    } catch (error) {
        console.log("error fetching category", error)
    }
})
//  article content saved 
FormRoute.route("/content").post(UserMiddleware, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated." });
        }
        const { content, title } = req.body

        const createContent = new articleContent({ content, title, userId: req.user._id })
        await createContent.save()

        // const existingArticle = await article.findOne({ userId : req.user._id })

        // if (!existingArticle) {
        //     return res.status(404).json({ message: "Article not found" });  
        // }
        // // Update the title and content of the existing article
        // existingArticle.title = title
        // existingArticle.content = content
        // await existingArticle.save()    

        res.status(200).json({
            message: "content received successfully", createContent
        })
    } catch (error) {
        console.log("error fetching content")
        res.status(500).json({ error: "Error saving content to database" });
    }

})
// show article based on id
FormRoute.route("/getarticle/:id").get(UserMiddleware, async (req, res) => {

    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated." });
        }
        const contentId = req.params.id
        const Content = await article.findOne({ _id: contentId }, { title: 1, content: 1 })

        if (!Content) {
            return res.status(404).json({ message: "Content not found for this user." });
        }
        res.status(200).json(Content)
    } catch (error) {
        console.log("error fetching article", error)
    }
})
// delete article
FormRoute.route('/deletearticle/:id').delete(UserMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        await article.deleteOne({ _id: id })
        res.status(200).json({ message: "article deleted", id })
    } catch (error) {
        console.log("error deleting article")
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

        const userExists = await User.findOne({ email: email }).select('+password');;
        if (!userExists) {
            res.status(400).json({ message: "invalid credential" })
            return;
        }
        const isValidPassword = await userExists.comparePassword(password)
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
        const paymentID = req.body.paymentId;
        console.log("payment id in backend : ", paymentID)
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated." });
        }
        const searchLimits = { '199': 50, '499': Infinity }
        if (paymentID['199'] && req.user.clickCount < searchLimits['199']) {
            req.user.clickCount = (req.user.clickCount || 0) + 1
        } else if (paymentID['499']) {
            req.user.clickCount = (req.user.clickCount || 0) + 1
        }
        else {
            req.user.clickCount = Math.min((req.user.clickCount || 0) + 1, 20)
        }

        if (req.user.clickCount >= searchLimits['199']) {
            res.status(401).json({ message: "Your search limit exceeded! Please upgrade your plan." });
            return; // End the request
        }
        await req.user.save();
        res.status(200).json({ message: "Search successful." });
    } catch (error) {
        console.log("Error while counting button click", error)
    }
})

// payment method

const instance = new Razorpay({
    key_id: process.env.Key_Id,
    key_secret: process.env.Key_Secret,
});

FormRoute.route('/verify').post(async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100), // amount in the smallest currency unit
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

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const dataToHash = `${razorpay_order_id}|${razorpay_payment_id}`;
        const generated_signature = crypto.createHmac('sha256', process.env.Key_Secret).update(dataToHash).digest("hex")

        if (generated_signature == razorpay_signature) {
            console.log("Payement verfication successfull")
            res.locals.paymentId = razorpay_payment_id;

            res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)
        } else {
            console.log("Signature mismatch, payment verification failed");
            return res.redirect(`http://localhost:3000/paymentfailed`)
        }
    } catch (error) {
        console.log("error in payment verification ", error)
        res.status(500).json({ error: "Payment verification failed" });
    }
})
// subscription plan
FormRoute.route("/createSubscription").post(UserMiddleware, async (req, res) => {
    try {
        const { amount } = req.body
        const planId = amount === 199 ? 'plan_NgG9DZEKg6JtL2' : 'plan_Nnj0ceCKrBcnZI';

        const options = {
            url: 'https://api.razorpay.com/v1/subscriptions',
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from('rzp_test_BegMW1Oi3V4TF6:AnXbKcRMcBxpzO2usLRJaylA').toString('base64')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plan_id: planId,
                total_count: 12,
                customer_notify: 1,
            })
        };

        // Make a request to Razorpay API to create the subscription
        const response = await fetch('https://api.razorpay.com/v1/subscriptions', options);
        const data = await response.json();

        if (response.ok) {
            console.log('Subscription created:', data);
            res.status(200).json({ message: 'Subscription created successfully', data });
        } else {
            console.error('Failed to create subscription:', data);
            res.status(500).json({ error: 'Failed to create subscription' });
        }
    } catch (error) {
        console.error('Error creating subscription:', error);
        res.status(500).json({ error: 'Failed to create subscription' });
    }
})
FormRoute.route("/subscription").post(UserMiddleware, async (req, res) => {
    try {
        const { amount, referenceNo } = req.body
        const planId = amount === 199 ? 'plan_NgG9DZEKg6JtL2' : 'plan_Nnj0ceCKrBcnZI';
        const user = await User.findById(req.user._id)
        const emailId = req.user.email
        console.log("vvvvvvvvv", req.body)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const subscription = await instance.subscriptions.create({
            plan_id: planId,
            total_count: 12,
            customer_notify: 1,
        });
        user.subscription.id = subscription.id
        user.subscription.status = subscription.status
        await user.save();

        const data = await Payment.create({ emailId, subscriptionId: subscription.id, planId, paymentId: referenceNo })
        if (!data) {
            res.status(400).json("Data Not Found")
        }
        res.status(201).json({
            success: true,
            subscriptionId: subscription.id,
            data
        });

    } catch (error) {
        console.error("error in subscription : ", error);
        res.status(500).json({ message: "error", error });
    }
})
FormRoute.route("/razorpaykey").get(async (req, res) => {
    res.status(200).json({
        success: true,
        key: process.env.Key_Id
    })
})
FormRoute.route("/paymentid").post(UserMiddleware, async (req, res) => {
    try {
        const email = req.user.email
        const { referenceNo } = req.body
        console.log("Reference number", referenceNo)
        res.status(200).json({ message: "payment id received", referenceNo })

        const payment = await Payment.findOne({ emailId: email })
        payment.paymentId = referenceNo
        await payment.save()

    } catch (error) {
        console.log("error", error)
    }
})
module.exports = FormRoute
