import { connection } from "../db/postgres.js";

async function urlShortenControll(idUser, url, shortUrl, initialValue) {
    return connection.query(`
    INSERT INTO "shortenUrls" ("idUser", url, "shortUrl", views)
    VALUES ($1, $2, $3, $4)
    `, [idUser, url, shortUrl, initialValue]);
}


async function getUrlById(idGetURL) {
    return connection.query(`
    SELECT id, url, "shortUrl" FROM "shortenUrls"
    WHERE id = $1
    `, [idGetURL]);
}

async function getShortUrlOpen(shortUrl) {
    return connection.query(`
    SELECT * FROM "shortenUrls"
    WHERE "shortUrl" = $1
`, [shortUrl]);
}

async function getShortUrlOpenPlus(idgetShortUrl) {
    return connection.query(`
    UPDATE "shortenUrls"
    SET views = views + 1
    WHERE id = $1
    `, [idgetShortUrl]);
}

async function deleteUrl(idDelete) {
    return connection.query(`
    DELETE FROM "shortenUrls"
    WHERE id = $1`,
        [idDelete]);
}

async function getRankingCtrl() {
    return connection.query(`
    SELECT
    users.id,
    users.name,
    count("shortenUrls"."idUser") AS "linksCount",
    count("shortenUrls".views) AS "visitCount"
    FROM
    users
    LEFT JOIN "shortenUrls"
    ON "shortenUrls"."idUser" = users.id
    GROUP BY
    users.id,
    users.name
    ORDER BY
    "visitCount" DESC
    LIMIT
    10;
`);
}

export const urlRP = {
    urlShortenControll,
    getUrlById,
    getShortUrlOpen,
    getShortUrlOpenPlus,
    deleteUrl,
    getRankingCtrl
}