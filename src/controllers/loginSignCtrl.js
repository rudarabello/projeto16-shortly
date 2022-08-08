import bcrypt from 'bcrypt';
import { loginSignRP } from '../repositories/loginSignRP.js';
import { createToken } from '../services/jwt.js';


export async function signUpController(req, res) {
    const {name, email, password} = req.body;
    try {
        const passwordCrypted = bcrypt.hashSync(password, 10);
        await loginSignRP.signUpController(name, email,passwordCrypted);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function signInController(req, res) {
    const { idUser } = res.locals;
    try {
        const token = createToken({ idUser: idUser })
        res.status(200).send(token);
    } catch (error) {
        console.log(error);
        res.sendStatus(501);
    }
}