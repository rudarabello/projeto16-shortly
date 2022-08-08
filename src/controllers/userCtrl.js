import { getUserMeRP } from "../repositories/userRP.js";

export async function getUserMe(req, res) {
    const { idUser } = res.locals.verifyTokenResult;
    console.log(idUser)
    try {
        const { rows: response } = await getUserMeRP.getUserMe(idUser);
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