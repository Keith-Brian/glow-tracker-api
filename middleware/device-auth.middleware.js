const jwt = require('jsonwebtoken');

const deviceAuthentication = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized Device Access' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.device = {deviceId: decoded.deviceId};
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid Device Token' });
    }
}

module.exports = deviceAuthentication;