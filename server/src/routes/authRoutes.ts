import { Request, Response, Router } from 'express';
import { loginCall } from '../controllers/auth/loginController';
import { signupCall } from '../controllers/auth/signupController';

import jwt from "jsonwebtoken";
import { secretKey } from '../config/envConfig';
import { isAuthCall } from '../controllers/auth/isAuthController';

const router: Router = Router();

router.post('/login',loginCall);
router.post("/signup",signupCall);

router.get("/isAuth", isAuthCall)


export default router;