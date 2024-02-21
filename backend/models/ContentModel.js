const mongoose = require("mongoose")

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true,
    }
})
const articleContent = mongoose.model("articleContent", contentSchema);

module.exports = articleContent