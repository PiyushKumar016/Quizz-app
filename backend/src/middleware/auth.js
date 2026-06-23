import { verifyToken } from "./../utils/token.js";

export const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if(!token) {
        res.status(401).json({ message: 'UnAuthorized User' });
    } else {
        try {
            const email = verifyToken(token);
            next();
        } catch(err) {
            res.status(401).json({ message: 'UnAuthorized User' });
        }
    }
}