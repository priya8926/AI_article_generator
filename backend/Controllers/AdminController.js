const User = require("../models/User");
const Payment = require("../models/PaymentSuccess")
const Category = require('../models/Category')
const Language = require('../models/Language')
const Length = require("../models/Length");
const Contact = require("../models/ContactModel");
const Subscription = require("../models/Subscription");

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
        const pay = await Payment.find({})
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
const deletePayment = async (req, res) => {
    try {
        const id = req.params.id
        await Payment.deleteOne({ _id: id })
        res.status(200).json({ message: "Payment deleted" })
    } catch (error) {
        console.log(error)
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
const editCategory = async (req, res) => {
    try {
        const id = req.params.id
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCategory) {
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
        const existingLanguage = await Language.findOne({ language })
        if (existingLanguage) {
            return res.status(400).json({ error: 'Language already exists' });
        }
        await Language.create({ language })
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
const editLanguage = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("language req.body", req.body)
        // const updateLanguage = await Language.findByIdAndUpdate(id, req.body, { new: true })
        const { language } = req.body;
        const updateLanguage = await Language.updateOne({ _id: id }, { $set: { language } });

        if (!updateLanguage) {
            return res.status(404).json({ message: "No such Language found" })
        }
        res.status(200).json({ message: "Language updated" })
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
        const existingLength = await Length.findOne({ length })
        if (existingLength) {
            res.status(401).json({ message: "Length already exists" })
        }
        await Length.create({ length })
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
const editLength = async (req, res) => {
    try {
        const id = req.params.id;
        const { length } = req.body
        const data = await Length.findByIdAndUpdate(id, { length }, { new: true })
        if (!data) {
            return res.status(404).json('The length you are trying to update does not exist')
        }
        res.status(200).json({ message: "Length updated successfully.", data });

    } catch (error) {
        console.log(error)
    }
}
const getContact = async (req, res) => {
    try {
        const data = await Contact.find({})
        if (!data || data.length === 0) {
            res.status(401).json('No data Found')
        }
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}
const Allsubscription = async (req, res) => {
    try {
        const data = await Subscription.find({})
        if (!data || data.length === 0) {
            res.status(401).json('No data Found')
        }
        res.status(200).json(data);
    } catch (error) {
        console.log("error in subscription", error)
    }
}
const deleteSubscription = async(req,res)=>{
    try {
        const id= req.params.id
        const data = await  Subscription.deleteOne({_id : id})
        if(!data){
            return  res.status(400).send("No Data found")
        }
        res.status(200).json({message: "subscription deleted" })
    } catch (error) {
        console.log(error)
    }
}
module.exports = { getAllUser, getUserById, updateUserById, deleteUserById, getPaymentHistory, getCategory, addCategory, deleteCategory, editCategory, getLanguage, addLanguage, deleteLanguage, addLength, getLength, deleteLength, editLanguage, editLength, getContact, Allsubscription, deletePayment ,deleteSubscription}