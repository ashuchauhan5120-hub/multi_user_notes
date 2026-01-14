const { pool } = require("../config/db");

async function getAllNotesByAdmin() {
    const query = `
    SELECT notes.id, notes.title, notes.content, notes.created_at, users.username,  users.email
    FROM notes
    INNER JOIN users
    ON notes.user_id = users.id
    WHERE is_deleted = false
    `;

    const result = await pool.query(query)
    return result.rows
}

async function removeNotesByAdmin(id) {
    const query = `
    UPDATE notes SET is_deleted = true
    WHERE id = $1
    `;

    const result = await pool.query(query, [id])
    return result.rows[0]
}

module.exports = {
    getAllNotesByAdmin,
    removeNotesByAdmin
}