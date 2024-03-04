const jwt = require("jsonwebtoken")
const User = require("../models/User")

const UserMiddleware = async (req, res, next) =>{
    const token = req.header("Authorization")

    if (!token) {
        return res.status(401).json({ message: "Token not provided" })
    }
    if (!token.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid token format" })
    }

    const jwtToken = token.substring(7);
    console.log('token from user middleware', jwtToken)

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)
        console.log("jwt verified token ", isVerified)

        const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 })
        console.log("logged in user data ", userData)
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = userData;
        req.token = jwtToken;
        req.userId = userData._id;
        next()
    } catch (error) {
        console.log("Error in user middleware ", error)
    }
}   
const SubscriptionMiddleware = async(req,res,next) =>{
    try {
        if(req.user.subscription.status !== 'active'){
    return res.status(400).status({message : "Only subscribers can acces"})
        }
        next()
    } catch (error) {
        console.log("error in subscription middleware")
    }
}
module.exports = {UserMiddleware , SubscriptionMiddleware}