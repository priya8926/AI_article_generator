const express = require("express")
const router = express.Router()
const adminController = require('../Controllers/AdminController')
const { UserMiddleware } = require("../middleware/UserMiddleware")

router.route("/users").get(UserMiddleware ,adminController.getAllUser)

router.route("/users/:id").get(UserMiddleware , adminController.getUserById)

router.route("/users/update/:id").patch(UserMiddleware , adminController.updateUserById)

router.route("/users/delete/:id").delete(UserMiddleware , adminController.deleteUserById)

router.route("/payments").get(UserMiddleware,adminController.getPaymentHistory)

router.route("/category").get(UserMiddleware , adminController.getCategory)

router.route("/category/addcategory").post(UserMiddleware , adminController.addCategory)

router.route("/category/deletecategory/:id").delete(UserMiddleware , adminController.deleteCategory)

router.route("/category/updatecategory/:id").patch(UserMiddleware , adminController.editCategory)

router.route("/language").get(UserMiddleware , adminController.getLanguage)

router.route("/language/addLanguage").post(UserMiddleware , adminController.addLanguage)

router.route("/language/deleteLanguage/:id").delete(UserMiddleware , adminController.deleteLanguage)

router.route("/length").get(UserMiddleware , adminController.getLength)

router.route("/length/addLength").post(UserMiddleware , adminController.addLength)

router.route("/length/deleteLength/:id").delete(UserMiddleware ,  adminController.deleteLength)

module.exports = router