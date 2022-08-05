import { clientPg } from "../db/postgres.js";
import { nanoid } from 'nanoid';

export async function urlShortenControll(req, res) {
    const shortUrl = nanoid();
    const { idUser } = res.locals.verifyTokenResult;
    const { url } = req.body;
    try {
        await clientPg.query(`
        INSERT INTO "shortenUrls" ("idUser", url, "shortUrl")
        VALUES ($1, $2, $3)
        `, [idUser, url, shortUrl]);
        res.status(201).send({ shortUrl: shortUrl });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
