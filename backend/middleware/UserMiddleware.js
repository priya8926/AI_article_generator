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

        req.user = userData;
        req.token = jwtToken;
        req.userId = userData._id;
        
        next()
    } catch (error) {
        console.log("Error in user middleware ", error)
    }
}   

module.exports = UserMiddleware