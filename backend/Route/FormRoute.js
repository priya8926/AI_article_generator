require('dotenv').config()
const express = require("express")
const article = require("../models/FormModel")
const articleContent = require("../models/ContentModel")
const User = require("../models/User")
const { UserMiddleware } = require("../middleware/UserMiddleware")
const FormRoute = express.Router()
const bcrypt = require("bcryptjs")
const Razorpay = require("razorpay")
const crypto = require('crypto');
const Payment = require('../models/PaymentSuccess')
const Subscription = require('../models/Subscription')

// Form category logic
FormRoute.route("/category").post(UserMiddleware, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated." });
        }
        const data = req.body
        console.log(data)

        const { category, language, length, promptInput, title, content } = req.body

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
        const useArticle = await article.find({ userId: req.user._id }, { category: 1, language: 1, length: 1, promptInput: 1 , title:1 , content:1 }).sort({ _id: -1 } )

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
        const user = await User.findById(req.user._id);
        const userPlanId = user.planId;
        const paymentID = req.body.paymentId;

        const searchLimits = { '199': 50, '499': Infinity };
        let searchLimit = 20; 

        if (userPlanId === process.env.plan_id199) {
            searchLimit = searchLimits['199']; 
        } else if (userPlanId === process.env.plan_id499) {
            searchLimit = searchLimits['499'];
        }

        if (paymentID === '199' && req.user.clickCount < searchLimit) {
            req.user.clickCount = (req.user.clickCount || 0) + 1;
        } else if (paymentID === '499' && req.user.clickCount < searchLimit) {
            req.user.clickCount = (req.user.clickCount || 0) + 1;
        } else {
            req.user.clickCount = Math.min((req.user.clickCount || 0) + 1, searchLimit);
        }

        if (req.user.clickCount >= searchLimit) {
            res.status(401).json({ message: "Your search limit exceeded! Please upgrade your plan." });
            return; // End the request
        }
        await req.user.save();
        res.status(200).json({ message: "Search successful." });
    } catch (error) {
        console.log("Error while counting button click", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

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
FormRoute.route("/buySubscription").post(UserMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const emailId = req.user.email
        const { selectedAmount, referenceNo } = req.body
        
        const planId = selectedAmount === '199' ? process.env.plan_id199 : process.env.plan_id499
        console.log("buySubscription...", req.body)

        const subscription = await instance.subscriptions.create({
            plan_id: planId,
            total_count: 12,
            customer_notify: 1
        })
        user.subscription.id = subscription.id
        user.subscription.status = subscription.status
        user.planId = planId
        await user.save();

        const Paymentdata = await Payment.create({ emailId, subscriptionId: subscription.id, planId: subscription.plan_id, paymentId: referenceNo })

        const subData = await Subscription.create({ emailId, subscriptionId: subscription.id, planId: subscription.plan_id, paymentId: referenceNo })

        console.log("subscription", subscription);
        res.status(200).json({ success: true, subscription, Paymentdata: Paymentdata, subData: subData })
    } catch (error) {
        console.log(error)
    }
})

FormRoute.route("/razorpaykey").get(async (req, res) => {
    res.status(200).json({
        success: true,
        key: process.env.Key_Id
    })
})
module.exports = FormRoute
