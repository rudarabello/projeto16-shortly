import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function createToken (payload){
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });
    return token
}

export function verifyToken(token){
    try {
        const verifyToken =  jwt.verify(token, process.env.SECRET);
        return verifyToken
    } catch (error) {
        return false
    }
}