const express = require("express")
const article = require("../models/FormModel")
const articleContent = require("../models/ContentModel")
const User = require("../models/User")
// const validate = require("../middleware/signupmiddleware")
// const registerValidation = require("../validation/registerValidation")
const FormRoute = express.Router()

// Form category logic
FormRoute.route("/category").post(async (req, res) => {
    try {
        const clickCount = await article.countDocuments({})
        if (clickCount > 2) {
            res.status(400).json({ message: "Search limit exceeded. Please upgrade your plan." });
        } else {
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
        }
    } catch (error) {
        console.log("clicking count error", error)
        res.status(500).json({ message: "Internal server error" });
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
        const { username, email, phone, password } = req.body;
        if (!username || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const createUser = await User.create({ username, email, phone, password })
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

        const userExists = await User.findOne({ email:email });
        if (!userExists) {
            res.status(400).json({ message: "invalid credential" })
        }
        const isValidPassword = userExists.comparePassword(password)
        if (isValidPassword) {
            return res.status(200).json({
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




module.exports = FormRoute