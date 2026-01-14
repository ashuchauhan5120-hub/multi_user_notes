const { getAllNotesByAdmin, removeNotesByAdmin } = require("../models/adminModel");

async function allNotesForAdmin(req, res) {
  try {
    const allNotes = await getAllNotesByAdmin();

    res.render("adminNotes", { allNotes });
  } catch (error) {
    console.error("Failed to load all notes", error);
    res
      .status(500)
      .json({ error: "Failed to load all notes. Please try again" });
  }
}


async function removeNotesForAdmin(req, res) {
  const id = req.params.id;

  if (!id){
    return res.status(400).json({error: "Id is required"})
  }

  try {
    const removeNotes = removeNotesByAdmin(id)
    res.status(201).json({message: "notes deleted successfully", removeNotes})
  } catch (error) {
    console.error("Failed to delete notes", error);
    res.status(500).json({error: "Failed to delete. Please try again"})
  }
}
module.exports = {
    allNotesForAdmin,
    removeNotesForAdmin
}