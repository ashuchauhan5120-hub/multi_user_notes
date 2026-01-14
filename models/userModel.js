const { pool } = require("../config/db");

async function getUserFromDB(email) {
  const query = `
    SELECT * FROM users WHERE email = $1
    `;

  const result = await pool.query(query, [email]);
  return result.rows[0];
}

async function createNewUser(username, email, hashPassword) {
  const query = `
    INSERT INTO users (username, email, hash_password) VALUES ($1, $2, $3)
    RETURNING *`;

  const result = await pool.query(query, [username, email, hashPassword]);
  return result.rows[0]
}


module.exports = {
  getUserFromDB,
  createNewUser
};