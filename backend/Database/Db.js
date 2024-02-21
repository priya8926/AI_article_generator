const mongoose = require("mongoose")

const URL = "mongodb://localhost:27017/aiarticle"

const connectdb = async()=>{
    try {
        await mongoose.connect(URL)
        console.log("successfull database connection")
    } catch (error) {
        console.log("Database connection failed")
        process.exit(0);
    }
}
module.exports = connectdb;