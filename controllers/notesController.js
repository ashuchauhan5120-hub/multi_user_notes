const {
  createNotesByUserId,
  getAllNotesByUserId,
  removeUserNotesById,
  updateNoteByUserId,
  searchUserNotes
} = require("../models/notesModel");

// get all notes
async function getAllNotes(req, res) {
  const userId = req.user.userId;

  try {
    const notes = await getAllNotesByUserId(userId);
    res.render("notes", { notes });
  } catch (error) {
    console.error("Failed to load notes", error);
    res.status(500).json({ error: "Failed to load notes. Please try again" });
  }
}

// Create new notes
async function createNewNotes(req, res) {
  const { title, content } = req.body;

  if (!title && !content) {
    return res.status(400).json({ error: "At leat one field is required" });
  }

  try {
    const userId = req.user.userId;
    await createNotesByUserId(title, content, userId);
    res.json({ success: true });
  } catch (error) {
    console.error("Failed to create notes:", error);
    res.status(500).json({ error: "Failed to create. Please try again." });
  }
}

// delete a note
async function removeNotesById(req, res) {
  const noteId = req.params.id;

  if (!noteId) {
    return res.status(400).json({ error: "Id is required" });
  }

  try {
    const userId = req.user.userId;
    await removeUserNotesById(userId, noteId);
    res.json({ success: true });
  } catch (error) {
    console.error("Failed to delete notes:", error);
    res.status(500).json({ error: "Failed to delete. Please try again." });
  }
}

// update a note
async function updateNoteById(req, res) {
  const noteId = req.params.id;
  const { newTitle, newContent } = req.body;

  if (!newTitle && !newContent) {
    return res.status(400).json({ error: "At least one field is required" });
  }

  if (!noteId) {
    return res.status(400).json({ error: "Id is required" });
  }

  try {
    const userId = req.user.userId;

    await updateNoteByUserId(newTitle, newContent, userId, noteId);

    res.json({ success: true });
  } catch (error) {
    console.error("Failed to update notes:", error);
    res.status(500).json({ error: "Failed to update. Please try again." });
  }
}

async function searchNotesByUser(req, res) {
  const searchQuery = req.query.q;

  if (!searchQuery){
    return res.status(400).json({error: "Enter search query"})
  };

  try {
    const userId = req.user.userId;
    const notes = await searchUserNotes(userId,  searchQuery);
    res.json({success: true, notes})
  } catch (error) {
    console.error("Failed to search", error);
    res.status(500).json({error: "Failed to search notes"})
  }
}


module.exports = {
  getAllNotes,
  createNewNotes,
  removeNotesById,
  updateNoteById,
  searchNotesByUser
};
