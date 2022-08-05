import { verifyToken } from '../services/jwt.js';

export async function verifyTokenMW (req, res, next){
    const token = req.headers.authorization;
    if(!token){
        return res.sendStatus(401);
    }
    const verifyTokenResult = verifyToken(token.replace('Bearer ', ''));
    if(!verifyTokenResult){
        return res.sendStatus(401);
    }
    res.locals.verifyTokenResult = verifyTokenResult;
    next();
}