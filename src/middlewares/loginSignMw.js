import { registerSchema, loginSchema } from "../schemas/loginSignSchemas.js";
import bcrypt from 'bcrypt';
import { middlewareRP } from "../repositories/middlewareRP.js";

export async function signUpMW(req, res, next) {
    const userToRegister = req.body;
    const { error } = registerSchema.validate(userToRegister);
    if (error) {
        return res.status(422).send(error.details[0].message);
    }
    try {
        const emailSignUp = userToRegister.email;
        const { rows: verifyEmail } = await middlewareRP.signUpMiddle(emailSignUp);
        if (verifyEmail.length > 0) {
            return res.status(409).send('Email já existe!');
        }
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function signInMW(req, res, next) {
    const signInData = req.body;
    const { error } = loginSchema.validate(signInData);
    if (error) {
        return res.status(422).send(error.details[0].message);
    }
    try {
        const emailSignIn = signInData.email
        const { rows: verifyEmail } = await middlewareRP.signInMiddle(emailSignIn)
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