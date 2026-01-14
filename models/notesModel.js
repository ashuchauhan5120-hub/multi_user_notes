const { pool } = require("../config/db");

async function getAllNotesByUserId(userId) {
    const query = `
    SELECT id, title , content , created_at , updated_at FROM notes 
    WHERE user_id = $1 AND is_deleted = false
    `;

    const result = await pool.query(query, [userId]);
    return result.rows
}

async function createNotesByUserId(title, content, userId) {
    const query = `
    INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) 
    RETURNING *
    `;

    const result = await pool.query(query, [title, content, userId]);
    return result.rows[0]
}

async function removeUserNotesById(userId, noteId) {
    const query = `
    UPDATE notes SET is_deleted = true
    WHERE user_id = $1 AND id = $2
    RETURNING *`;

    const result = await pool.query(query, [userId, noteId]);
    return result.rows[0]
}

async function updateNoteByUserId(title, content, userId, noteId) {
    const query = `
    UPDATE notes SET title = $1 , content = $2
    WHERE user_id = $3 AND id = $4
    RETURNING *`;

    const result = await pool.query(query, [title, content, userId, noteId]);
    return result.rows[0]
}

async function searchUserNotes(userId, searchQuery) {
    const query = `
    SELECT title , content , created_at FROM notes
    WHERE user_id = $1 AND is_deleted = false
    AND (
    LOWER(title) LIKE $2
    OR
    LOWER(content) LIKE $2
    )
    ORDER BY created_at DESC
    `;

    const searchText = `%${searchQuery.toLowerCase()}%`
    const result = await pool.query(query, [userId, searchText]);
    return result.rows;
}


module.exports = {
    createNotesByUserId,
    getAllNotesByUserId,
    removeUserNotesById,
    updateNoteByUserId,
    searchUserNotes
}