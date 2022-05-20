import * as userHandlers from './../handlers/users.handlers.js';
import express from "express";
import {authorization} from '../../middleware/auth.middleware.js';
import {signUpValidator, loginValidator} from '../../middleware/userRoutes.validators.js';
export const router = express.Router();

router.post('/signup', signUpValidator, userHandlers.createUser);
router.post('/signIn', loginValidator, userHandlers.signIn);
router.get('/points', authorization, userHandlers.getUserPoints);
router.get('/transactions', authorization, userHandlers.getUserTransfers);

