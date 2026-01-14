const express = require("express");
const { loginForm , loginUser} = require("../controllers/loginController");
const router = express.Router()

router.get("/", loginForm)
router.post("/", loginUser)

module.exports = router