import { Router } from 'express';
import { signUpController, signInController } from '../controllers/loginSignCTRL.js';
import { signUpMiddle, signInMiddle } from '../middlewares/loginAndRegisterMW.js';
import { verifyTokenMW } from '../middlewares/verifyTokenMW.js';
import { urlShortenMW } from '../middlewares/urlShortenMW.js';
import { urlShortenControll, getUrlById } from '../controllers/urlCTRL.js';


const route = Router();

route.post('/signup', signUpMiddle, signUpController);
route.post('/signin', signInMiddle, signInController);

route.post('/urls/shorten', verifyTokenMW, urlShortenMW, urlShortenControll);

route.get('/urls/:id', getUrlById);


export default route;