import { Router } from 'express';
import { signUpController, signInController } from '../controllers/loginAndRegisterCTRL.js';
import { signUpMiddle, signInMiddle } from '../middlewares/loginAndRegisterMW.js';

const route = Router();

route.post('/signup', signUpMiddle, signUpController);
route.post('/signin', signInMiddle, signInController);


export default route;