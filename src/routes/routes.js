import { Router } from 'express';
import { signUpController, signInController } from '../controllers/loginAndRegisterCTRL.js';
import { signUpMiddle, signInMiddle } from '../middlewares/loginAndRegisterMW.js';
import { verifyTokenMW } from '../middlewares/verifyTokenMW.js';
import { urlShortenMW } from '../middlewares/urlShortenMW.js';
import { urlShortenControll } from '../controllers/urlShortenCTRL.js';

const route = Router();

route.post('/signup', signUpMiddle, signUpController);
route.post('/signin', signInMiddle, signInController);

route.post('/urls/shorten', verifyTokenMW, urlShortenMW, urlShortenControll);


export default route;