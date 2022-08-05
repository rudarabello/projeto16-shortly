import { urlShortenSchema } from '../schemas/urlSchemas.js';
import { clientPg } from "../db/postgres.js";

export async function urlShortenMW (req, res, next){
    const url = req.body;
    const { error } = urlShortenSchema.validate(url);
    if(error){
        return res.status(422).send('Invalid Format!');
    }
    next();
}

export async function deleteShortUrlMW (req, res, next){
    const idToDelete = parseInt(req.params.id);
    if(isNaN(idToDelete)){
        return res.sendStatus(422);
    }
    const { idUser } = res.locals.verifyTokenResult;
    try {
        
        const { rows: verifyUrlId } = await clientPg.query(`
        SELECT * FROM "shortenUrls"
        WHERE id = $1
        `, [idToDelete]);
        
        if(verifyUrlId.length < 1){
            return res.sendStatus(404);
        }
        if(verifyUrlId[0].fromUserId !== idUser){
            return res.sendStatus(401);
        }

        next();
        
    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }
}