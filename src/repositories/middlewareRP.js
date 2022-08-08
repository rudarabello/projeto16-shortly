import { connection } from "../db/postgres.js";

async function signUpMiddle(emailSignUp) {
    return connection.query(`
    SELECT * FROM users WHERE email = $1`,
        [emailSignUp]);
}


async function signInMiddle(emailSignIn) {
    return connection.query(`
    SELECT * FROM users WHERE email = $1`,
        [emailSignIn]);
}

async function deleteUrlMW(idDelete) {
    return connection.query(`
    SELECT * FROM "shortenUrls"
    WHERE id = $1
    `, [idDelete]);
}
export const middlewareRP = {
    signUpMiddle,
    signInMiddle,
    deleteUrlMW
}

