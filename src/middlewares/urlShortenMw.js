import { urlShortenSchema } from '../schemas/urlSchemas.js';
import { middlewareRP } from '../repositories/middlewareRP.js';

export async function urlShortenMW (req, res, next){
    const url = req.body;
    const { error } = urlShortenSchema.validate(url);
    if(error){
        return res.status(422).send('Invalid Format!');
    }
    next();
}

export async function deleteUrlMW (req, res, next){
    const idDelete = parseInt(req.params.id);
    if(isNaN(idDelete)){
        return res.sendStatus(422);
    }
    const { idUser } = res.locals.verifyTokenResult;
    try {
        
        const { rows: response } = await middlewareRP.deleteUrlMW(idDelete);
        if(response.length < 1){
            return res.sendStatus(404);
        }
        if(response[0].idUser !== idUser){
            return res.sendStatus(401);
        }
        next();
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}