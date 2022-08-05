import { Router } from 'express';
import { signUpController, signInController } from '../controllers/loginSignCtrl.js';
import { signUpMiddle, signInMiddle } from '../middlewares/loginAndRegisterMw.js';
import { verifyTokenMW } from '../middlewares/verifyTokenMw.js';
import { urlShortenMW } from '../middlewares/urlShortenMw.js';
import { urlShortenControll, getUrlById, getShortUrlOpen } from '../controllers/urlCtrl.js';


const route = Router();

route.post('/signup', signUpMiddle, signUpController);
route.post('/signin', signInMiddle, signInController);

route.post('/urls/shorten', verifyTokenMW, urlShortenMW, urlShortenControll);

route.get('/urls/:id', getUrlById);
route.get('/urls/open/:shortUrl', getShortUrlOpen);


export default route;