const express = require("express")
const router = express.Router()
const adminController = require('../Controllers/AdminController')
const { UserMiddleware } = require("../middleware/UserMiddleware")

router.route("/users").get(UserMiddleware ,adminController.getAllUser)

router.route("/users/:id").get(UserMiddleware , adminController.getUserById)

router.route("/users/update/:id").patch(UserMiddleware , adminController.updateUserById)

router.route("/users/delete/:id").delete(UserMiddleware , adminController.deleteUserById)

router.route("/payments").get(UserMiddleware,adminController.getPaymentHistory)

module.exports = router