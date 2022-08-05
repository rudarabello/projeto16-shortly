import { clientPg } from "../db/postgres.js";
import { nanoid } from 'nanoid';

export async function urlShortenControll(req, res) {
    const shortUrl = nanoid();
    const { idUser } = res.locals.verifyTokenResult;
    const { url } = req.body;
    try {
        await clientPg.query(`
        INSERT INTO "shortenUrls" ("idUser", url, "shortUrl", views)
        VALUES ($1, $2, $3, $4)
        `, [idUser, url, shortUrl, 0]);
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


export async function getShortUrlOpen(req, res) {
    const shortUrl = req.params.shortUrl;
    try {
        const { rows: response } = await clientPg.query(`
        SELECT * FROM "shortenUrls"
        WHERE "shortUrl" = $1
    `, [shortUrl]);
        if (response.length < 1) {
            return res.sendStatus(404)
        }
        await clientPg.query(`
        UPDATE "shortenUrls"
        SET views = views + 1
        WHERE id = $1
        `, [response[0].id])
        return res.redirect(response[0].url);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}