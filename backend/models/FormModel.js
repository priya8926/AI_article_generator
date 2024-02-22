const mongoose = require("mongoose")

const formSchema = new mongoose.Schema({
    category : {
        type : String,
        require : true,
    },
    language : {
        type : String,
        require : true
    },
    length : {
        type : String,
        require : true
    }
    
})
const article =  mongoose.model("article" , formSchema);
module.exports = article