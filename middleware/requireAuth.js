const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "No token" })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next()
    } catch (error) {
        console.error("Inavlid token", error);
        return res.status(401).json({error: "Invalid token"})
    }

}

module.exports = {
    requireAuth
}