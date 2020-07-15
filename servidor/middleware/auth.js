const jwt = require('jsonwebtoken');
const { messages } = require('../config/messages');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    
    if (!token) {
        return res.status(401).json({ msg: messages.auth.missingToken })
    }

    try {
        const encryption = jwt.verify(token, process.env.SECRET);
        req.user = encryption.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: messages.auth.invalidToken })
    }
}