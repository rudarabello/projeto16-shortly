import { Router } from 'express';
import { signUpController, signInController } from '../controllers/loginSignCtrl.js';
import { signUpMiddle, signInMiddle } from '../middlewares/loginAndRegisterMw.js';
import { verifyTokenMW } from '../middlewares/verifyTokenMw.js';
import { urlShortenMW, deleteUrlMW } from '../middlewares/urlShortenMw.js';
import { urlShortenControll, getUrlById, getShortUrlOpen, deleteUrl, getRankingCtrl } from '../controllers/urlCtrl.js';
import { getUserMe } from '../controllers/userCtrl.js';


const route = Router();

route.post('/signup', signUpMiddle, signUpController);
route.post('/signin', signInMiddle, signInController);

route.post('/urls/shorten', verifyTokenMW, urlShortenMW, urlShortenControll);

route.get('/urls/:id', getUrlById);
route.get('/urls/open/:shortUrl', getShortUrlOpen);

route.delete('/urls/:id', verifyTokenMW, deleteUrlMW, deleteUrl);

route.get('/users/me', verifyTokenMW, getUserMe);

route.get('/ranking', getRankingCtrl);

export default route;