const express = require("express");
const { registerFrom, registerNewUser } = require("../controllers/registerController");
const router = express.Router()

router.get("/", registerFrom)
router.post("/", registerNewUser)

module.exports = router