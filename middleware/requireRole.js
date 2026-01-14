async function requireRole(req, res, next) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: "Unathorized" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
}


module.exports = {
    requireRole
}