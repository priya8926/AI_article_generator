const User = require("../models/User");
const payment = require("../models/PaymentSuccess")
const Category = require('../models/Category')
const Language = require('../models/Language')
const Length = require("../models/Length")

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
    const { id } = req.params;
    const { category } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, { category }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
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
const editCategory = async (req, res) => {
    try {
        const id = req.params.id
        const updateField = await Category.updateOne({ _id: id }, { $set: { ...req.body } })
        if (!updateField) {
            return res.status(404).json({ message: "No such category found" })
        }
        res.status(200).json({ message: "category updated" })
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
        await Language.create({ Language: language })
        res.status(200).json({ message: "Language Added Successfully", language })
    } catch (error) {
        console.log(error)
    }
}
const deleteLanguage = async (req, res) => {
    try {
        const id = req.params.id;
        await Language.deleteOne({ _id: id })
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        console.log(error)
    }
}
const getLength = async (req, res) => {
    try {
        const data = await Length.find({})
        if (!data) {
            res.status(401).json({ message: "No length record found" })
        }
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}
const addLength = async (req, res) => {
    try {
        const { length } = req.body
        if (!length) {
            res.status(400).json({ message: "Length is required" })
        }
        const existingLength = await Length.findOne({ Length: length })
        if (existingLength) {
            res.status(401).json({ message: "Length already exists" })
        }
        await Length.create({ Length: length })
        res.status(200).json({ message: "Length added", length })
    } catch (error) {
        console.log(error)
    }
}
const deleteLength = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Length.deleteOne({ _id: id })
        if (!data) {
            return res.status(404).json("No length with this id was found.")
        }
        res.status(200).json({ message: "Length deleted" })
    } catch (error) {
        console.log(error)
    }
}
module.exports = { getAllUser, getUserById, updateUserById, deleteUserById, getPaymentHistory, getCategory, addCategory, deleteCategory, editCategory, getLanguage, addLanguage, deleteLanguage, addLength, getLength, deleteLength }