import jwt from 'jsonwebtoken';

const auth = function(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Please login' });
    }
    try{
        const decoded = jwt.verify(token, process.env.secretKey);
        req.userId = decoded.userId; // Attach userId to request object
        next();
    }catch (error) {
        console.error('JWT verification failed:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
    
}

export default auth;