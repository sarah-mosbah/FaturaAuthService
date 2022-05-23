import * as userHandlers from './../handlers/users.handlers.js';
import express from "express";
import {signUpValidator, loginValidator, verifyValidator} from '../../middleware/userRoutes.validators.js';
export const router = express.Router();

router.post('/signup', signUpValidator, userHandlers.createUser);
// router.post('/verify', verifyValidator, userHandlers.verify);
router.post('/signIn', loginValidator, userHandlers.signIn);


