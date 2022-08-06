import { clientPg } from "../db/postgres.js";

export async function getUserMe(req, res) {
    const { idUser } = res.locals.verifyTokenResult;
    try {
        const { rows: response } = await clientPg.query(`
        SELECT 
        users.id, users.name, SUM("shortenUrls".views) as "visitCount",
        json_build_object
        (
        'id', "shortenUrls".id,
        'url', "shortenUrls".url,
        'views', "shortenUrls".views
        ) AS "shortenedUrls"
        FROM users
        JOIN "shortenUrls"
        ON "shortenUrls"."idUser" = users.id
        JOIN "shortenUrls" as "shortenUrls2"
        ON "shortenUrls2"."idUser" = users.id
        WHERE users.id = $1
        GROUP BY users.id, "shortenUrls".id, "shortenUrls".views
        `, [idUser]);
        if (response.length < 1) {
            return res.sendStatus(404);
        }
        const final = {
            id: response[0].id,
            name: response[0].name,
            visitCount: response[0].visitCount,
            shortenedUrls: response.map(item => item.shortenedUrls)
        }
        return res.status(200).send(final);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}