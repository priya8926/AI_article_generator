const mongoose = require("mongoose")

const LengthSchema = new mongoose.Schema({
    length :{
        type:Number,
        required : true,
        unique: true,
    }
})

const Length = mongoose.model("Length" , LengthSchema)
module.exports = Length