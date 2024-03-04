const mongoose = require("mongoose")

const URL = "mongodb://localhost:27017/aiarticle"
// const URL = `mongodb+srv://priya08:n94XmHY2R4wiWvld@clustxer0.d8rfvcy.mongodb.net/aiarticle`;
const connectdb = async () => {
    try {
        await mongoose.connect(URL)
        console.log("successfull database connection")
    } catch (error) {
        console.log("Database connection failed")
        process.exit(0);
    }
}
module.exports = connectdb;