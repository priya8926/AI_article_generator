const express = require("express")
const router = express.Router()
const getAllContact = require('../Controllers/ContactController')
const { UserMiddleware } = require("../middleware/UserMiddleware")

router.route( '/contact' ).post( UserMiddleware, getAllContact ) 

module.exports = router