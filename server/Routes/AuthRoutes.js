const express = require("express")
const router = express.Router()
const {body} = require("express-validator")

const {SignupController,LoginController} = require("../Controllers/Auth")

router.post("/signup",[
	body("email").isEmail().normalizeEmail().escape(),
	body("name").not().isEmpty().trim().escape(),
	body("password").not().isEmpty().escape(),
	],SignupController)
router.post("/login",[
	body("email").isEmail().normalizeEmail().escape(),
	body("password").not().isEmpty().escape(),
	],LoginController)

module.exports = router