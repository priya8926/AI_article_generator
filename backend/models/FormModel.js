const mongoose = require("mongoose")

const formSchema = new mongoose.Schema({
    category: {
        type: String,
        require: true,
    },
    language: {
        type: String,
        require: true
    },
    length: {
        type: String,
        require: true
    },
    promptInput: {
        type: String,
        require: true
    },
    title :{
        type:String,
        require : true
    },
    content:{
        type:String,
        require : true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})
const article = mongoose.model("article", formSchema);
module.exports = article