const User = require( "../models/User" );

// get all login user
const getAllUser = async(req,res)=>{
try {
    const users= await User.find({}, {password :0})
    if(!users || users.length ===0){
        res.status(401).json('No Users Found')
    }
    res.status(200).json(users)
} catch (error) {
    console.log("error catching user data" ,error )
}
}

module.exports = {getAllUser}