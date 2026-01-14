const express = require("express");
const { getAllNotes, createNewNotes, removeNotesById, updateNoteById , searchNotesByUser} = require("../controllers/notesController")
const router = express.Router()

router.get("/", getAllNotes)
router.post("/", createNewNotes)
router.delete("/:id", removeNotesById)
router.put("/:id", updateNoteById)
router.get("/search", searchNotesByUser)
module.exports = router