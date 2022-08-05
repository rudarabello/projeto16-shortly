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

export async function getUrlById(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.sendStatus(422);
    }
    try {
        const { rows: response } = await clientPg.query(`
        SELECT id, url, "shortUrl" FROM "shortenUrls"
        WHERE id = $1
        `, [id]);
        if (response.length < 1) {
            res.sendStatus(404);
        }
        res.status(200).send(response[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}