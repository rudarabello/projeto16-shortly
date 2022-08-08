import { connection } from "../db/postgres.js";

async function signUpController(name,email, passwordCrypted) {
	return connection.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
`, [name, email, passwordCrypted]);

}

export const loginSignRP = {
	signUpController
}