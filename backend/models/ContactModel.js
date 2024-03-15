const{ Schema , model} = require("mongoose")

const contactSchema = new Schema({
    username :{
        type : String,
        require : [true ,"Please enter your name"]
    },
    email :{
        type : String,
        require : [true , "Please enter your email"]
    },
    subject:{
        type : String,
        require : true
    },
    message :{
        type : String,
        require : [true , "Please enter message"]
    },
});

// Create a model or collection
const Contact = new model("Contact" , contactSchema)
module.exports = Contact