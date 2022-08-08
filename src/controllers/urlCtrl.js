import { nanoid } from 'nanoid';
import { urlRP } from '../repositories/urlRP.js';

export async function urlShortenControll(req, res) {
    const shortUrl = nanoid();
    const { idUser } = res.locals.verifyTokenResult;
    const { url } = req.body;
    const initialValue = 0;
    try {
        await urlRP.urlShortenControll(idUser, url, shortUrl, initialValue);
        res.status(201).send({ shortUrl: shortUrl });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getUrlById(req, res) {
    const idGetURL = parseInt(req.params.id);
    if (isNaN(idGetURL)) {
        return res.sendStatus(422);
    }
    try {
        const { rows: response } = await urlRP.getUrlById(idGetURL);
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
        const { rows: response } = await urlRP.getShortUrlOpen(shortUrl) 
        if (response.length < 1) {
            return res.sendStatus(404)
        }
        const idgetShortUrl = response[0].id
        await urlRP.getShortUrlOpenPlus(idgetShortUrl);
        return res.redirect(response[0].url);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteUrl(req, res) {
    const idDelete = parseInt(req.params.id);
    try {
        await urlRP.deleteUrl(idDelete);
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getRankingCtrl (req, res){
    try {
        const { rows: result } = await urlRP.getRankingCtrl();
        res.status(200).send(result);
    } catch (error) {
        
        console.log(error);
        res.sendStatus(500);
    }
}