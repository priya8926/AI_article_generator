const express = require("express")
const article = require("../models/FormModel")
const articleContent = require("../models/ContentModel")
const FormRoute = express.Router()


FormRoute.route("/category").post(async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        //    res.status(200).json("data successfully passed")
        const { category, language, length } = req.body
        if (!category || !language || !length) {
            return res.status(400).json("All fields are required")
        }

        const createForm = await article.create({ category, language, length })
        res.status(200).json({
            message: "Data received  Successfully!",
            id: createForm._id.toString()
        })

    } catch (error) {
        console.log(error)
    }
})
FormRoute.route("/content").post(async (req, res) => {
    try {
        const { content, title } = req.body

        const createContent = new articleContent({ content, title })
        await createContent.save()
        res.status(200).json({
            message: "content received successfully", createContent
        })
    } catch (error) {
        console.log("error fetching content")
        res.status(500).json({ error: "Error saving content to database" });
    }
})
module.exports = FormRoute