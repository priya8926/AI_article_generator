const express = require("express")
const router = express.Router()
const adminController = require('../Controllers/AdminController')
const { UserMiddleware } = require("../middleware/UserMiddleware")

router.route("/users").get(UserMiddleware ,adminController.getAllUser)

module.exports = router