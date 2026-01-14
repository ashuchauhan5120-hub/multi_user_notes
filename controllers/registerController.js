const bcrypt = require("bcrypt");
const { getUserFromDB, createNewUser } = require("../models/userModel");

function registerFrom(req, res) {
  res.render("registerForm");
}

async function registerNewUser(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are requried" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const existingUser = await getUserFromDB(email);

  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    await createNewUser(username, email, hashPassword);
 
    res.json({
      success: true,
      message: "sign up successfully",
    });
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: "Failed to create account. Please try again." });
  }
}

module.exports = {
  registerFrom,
  registerNewUser,
};
