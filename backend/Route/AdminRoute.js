const express = require("express")
const router = express.Router()
const adminController = require('../Controllers/AdminController')
const { UserMiddleware } = require("../middleware/UserMiddleware")
const adminMiddleware = require("../middleware/AdminMiddleware")

router.route("/users").get(UserMiddleware, adminMiddleware, adminController.getAllUser)

router.route("/users/:id").get(UserMiddleware, adminMiddleware, adminController.getUserById)

router.route("/users/update/:id").patch(UserMiddleware, adminMiddleware, adminController.updateUserById)

router.route("/users/delete/:id").delete(UserMiddleware, adminMiddleware, adminController.deleteUserById)

router.route("/payments").get(UserMiddleware, adminMiddleware, adminController.getPaymentHistory)

router.route("/category").get(UserMiddleware, adminMiddleware, adminController.getCategory)

router.route("/category/addcategory").post(UserMiddleware, adminMiddleware, adminController.addCategory)

router.route("/category/deletecategory/:id").delete(UserMiddleware, adminMiddleware, adminController.deleteCategory)

router.route("/category/updatecategory/:id").patch(UserMiddleware, adminMiddleware, adminController.editCategory)

router.route("/language").get(UserMiddleware, adminMiddleware, adminController.getLanguage)

router.route("/language/addLanguage").post(UserMiddleware, adminMiddleware, adminController.addLanguage)

router.route("/language/deleteLanguage/:id").delete(UserMiddleware, adminMiddleware, adminController.deleteLanguage)

router.route("/language/updateLanguage/:id").patch(UserMiddleware, adminMiddleware, adminController.editLanguage)

router.route("/length").get(UserMiddleware, adminMiddleware, adminController.getLength)

router.route("/length/addLength").post(UserMiddleware, adminMiddleware, adminController.addLength)

router.route("/length/deleteLength/:id").delete(UserMiddleware, adminMiddleware, adminController.deleteLength)

router.route("/length/updateLength/:id").patch(UserMiddleware, adminMiddleware, adminController.editLength)

router.route("/contact").get(UserMiddleware, adminMiddleware , adminController.getContact)

router.route("/subscription").post(UserMiddleware , adminMiddleware , adminController.Allsubscription)

module.exports = router