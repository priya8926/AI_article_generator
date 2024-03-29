const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const validator = require("validator")
const crypto = require("crypto")

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid Email address'],
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  planId: {
    type: String,
  },
  subscription: {
    id: String,
    status: String
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    default: () => new Date().toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    }),
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  console.log("pre method", this)
  const user = this
  if (!user.isModified("password")) {
    next()  //Call next only if password is not modified
  }

  // Hash the  password with saltround
  try {
    const saltround = await bcrypt.genSalt(10)
    const hash_password = bcrypt.hash("password", saltround)
    user.password = hash_password
  } catch (error) {
    console.log(error)
  }
})

//compare the password
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    console.log(error)
  }
}

//json web token
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin
      }, process.env.JWT_SECRET_KEY,
      { expiresIn: '365d' }
    );
  } catch (error) {
    console.log("token generation error", error)
  }
}
//generate reset password token
userSchema.methods.getResetPassToken =  async function() {
  try {
    // generating token
    let resetToken = crypto.randomBytes(20).toString('hex');

    //hashing and adding reserpassword to userschema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

    return resetToken;

  } catch (error) {
    console.log("error creating reset password token")
  }
}
const User = mongoose.model("User", userSchema)
module.exports = User;