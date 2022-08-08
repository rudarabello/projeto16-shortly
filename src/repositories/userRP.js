import { connection } from "../db/postgres.js";

async function getUserMe(idUser) {
	return connection.query(`
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

}

export const getUserMeRP = {
	getUserMe
}
