const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(403).json({ error: "User is not authorized." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
        if (err) {
            return res.status(403).json({ error: "User is not authorized." });
        }

        req.user = authData;
        next();
    });
}

module.exports.isAuthor = (req, res, next) => {
    
    if (req.user.role !== "AUTHOR") {
        return res.status(403).json({ error: "User is not authorized as author." });
    }
    next();
}