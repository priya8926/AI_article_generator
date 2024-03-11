const User = require("../models/User");

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
        if(!data){
            res.status(401).json({mesaage : "false"})
        }
        res.status(200).json(data)
    } catch (error) {
        console.log({error : "error updating user"})
    }
}

const deleteUserById =async(req,res)=>{
    try {
        const id = req.params.id;
        await  User.deleteOne({_id : id});
        res.status(200).json({message :"User Deleted"});
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getAllUser, getUserById, updateUserById ,deleteUserById}