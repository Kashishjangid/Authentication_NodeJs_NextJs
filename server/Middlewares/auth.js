const { access } = require('fs');
const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) {
        return res.status(401).json({ message: "Authentication failed , Token missing" });
    }
    try {
        const decode = jwt.verify(token, 'secret_key')
        req.user = decode
        next();
    } catch (err) {
        return res.status(500).json({ message: 'Authentication failed. Invalid token.' })
    }
}

module.exports = Auth