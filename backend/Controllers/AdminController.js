const User = require("../models/User");
const payment = require("../models/PaymentSuccess")
const Category = require('../models/Category')
const Language = require('../models/Language')

// get all login user
const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 })
        if (!users || users.length === 0) {
            res.status(401).json('No Users Found')
        }
        res.status(200).json(users)
    } catch (error) {
        console.log("error catching user data", error)
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById({ _id: id }, { password: 0 })
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id
        const updateUserdata = req.body
        const data = await User.updateOne({ _id: id }, { $set: updateUserdata })
        if (!data) {
            res.status(401).json({ mesaage: "false" })
        }
        res.status(200).json(data)
    } catch (error) {
        console.log({ error: "error updating user" })
    }
}

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        res.status(200).json({ message: "User Deleted" });
    } catch (error) {
        console.log(error)
    }
}
const getPaymentHistory = async (req, res) => {
    try {
        const pay = await payment.find({}, { razorpay_signature: 0 })
        // const user = await User.findOne({ email: email })
        if (!pay || pay.length === 0) {
            res.status(401).json('No payment Found')
        }
        res.status(200).json(pay)
    } catch (error) {
        console.log("error fetching payment")
        return res.status(500).json({ error: "Error fetching payment", message: error.message });
    }
}
const getCategory = async (req, res) => {
    try {
        const categoryData = await Category.find({})

        if (!categoryData) {
            res.status(401).json('no category found')
        }
        res.status(200).json(categoryData)
    } catch (error) {
        console.log("error fetching category")
    }
}
const addCategory = async (req, res) => {
    try {
        const { category } = req.body
        if (!category) {
            return res.status(400).json({ error: "Category is required" });
        }
        const existingCatogory = await Category.findOne({ category })
        if (existingCatogory) {
            return res.status(400).json({ error: 'Category already exists' });
        }
        // Add the new category to the list
        // categories.push(category);
        await Category.create({ category });
        res.status(201).json({ message: 'Category added successfully', category });
    } catch (error) {
        console.log("error adding category")
    }
}
const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id
        await Category.deleteOne({ _id: id })
        res.status(200).json({ message: "category deletd" })

    } catch (error) {
        console.log(error)
    }
}
const getLanguage = async (req, res) => {
    try {
        const data = await Language.find({})
        if (!data) {
            res.status(401).json('no language found')
        }
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

const addLanguage = async (req, res) => {
    try {
        const { language } = req.body
        if (!language) {
            res.status(400).json("language required")
        }
        const existingLanguage = await Language.findOne({ Language: language })
        if (existingLanguage) {
            return res.status(400).json({ error: 'Language already exists' });
        }
        await Language.create({ Language: language  })
        res.status(200).json({ message: "Language Added Successfully", language })
    } catch (error) {
        console.log(error)
    }
}
const deleteLanguage = async (req, res) => {
    try {
        const id = req.params.id;
        await Language.deleteOne({ _id: id })
        res.status(200).json({message: 'Deleted successfully'});
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getAllUser, getUserById, updateUserById, deleteUserById, getPaymentHistory, getCategory, addCategory, deleteCategory, getLanguage, addLanguage, deleteLanguage }