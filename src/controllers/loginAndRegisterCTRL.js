import bcrypt from 'bcrypt';
import { clientPg } from "../db/postgres.js";
import { createToken } from '../services/jwt.js';

export async function signUpController(req, res) {
    const userToRegister = req.body;

    try {

        const passwordCrypted = bcrypt.hashSync(userToRegister.password, 10);

        await clientPg.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
        `, [userToRegister.name, userToRegister.email.toLowerCase(), passwordCrypted]);

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
        res.sendStatus(500);

    }
}