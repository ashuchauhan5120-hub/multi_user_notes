const express = require("express");
const { allNotesForAdmin , removeNotesForAdmin} = require("../controllers/adminController");
const router = express.Router()

router.get("/", allNotesForAdmin)
router.delete("/:id", removeNotesForAdmin)

module.exports = router