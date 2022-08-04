import { clientPg } from "../db/postgres.js";
import { registerSchema, loginSchema } from "../schemas/loginAndRegisterSchemas.js";
import bcrypt from 'bcrypt';

export async function signUpMiddle(req, res, next) {
    const userToRegister = req.body;

    const { error } = registerSchema.validate(userToRegister);
    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    try {

        const { rows: verifyEmail } = await clientPg.query(`
        SELECT * FROM users WHERE email = $1`, [userToRegister.email.toLowerCase()]);

        if (verifyEmail.length > 0) {
            return res.status(409).send('Email já existe!');
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function signInMiddle(req, res, next) {
    const signInData = req.body;

    const { error } = loginSchema.validate(signInData);
    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    try {
        const { rows: verifyEmail } = await clientPg.query(`
        SELECT * FROM users WHERE email = $1`, [signInData.email.toLowerCase()]);

        if (verifyEmail.length < 1) {
            return res.sendStatus(401);
        }

        const verifyPassword = bcrypt.compareSync(signInData.password, verifyEmail[0].password);

        if (!verifyPassword) {
            return res.sendStatus(401);
        }

        res.locals.idUser = verifyEmail[0].id;

        next();
    } catch (error) {

        console.log(error);
        res.sendStatus(500);
    }
}