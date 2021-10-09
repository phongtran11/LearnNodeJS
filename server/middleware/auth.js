const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    
    // Verify token
    if(!token) {
        return res.status(401).json({
            susscess: true,
            message: 'Access token not found!!!',
        });
    };

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        
        // Add userId to req
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            success: false,
            message: 'Invalid token!!!',
        })
    }
}

module.exports = verifyToken;