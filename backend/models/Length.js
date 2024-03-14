const mongoose = require("mongoose")

const LengthSchema = new mongoose.Schema({
    Length :{
        type:Number,
        required : true,
        unique: true,
    }
})

const Length = mongoose.model("length" , LengthSchema)
module.exports = Length