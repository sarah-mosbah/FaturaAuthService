import * as userService from '../../services/user.service.js';
import crypto from 'crypto';
import { signJwt } from '../../utils/jwt.utils.js';
import { getPayload } from '../../utils/jwt.utils.js';
import * as rpcPublisher from '../../amqp/publisher.js';
export async function createUser(req, res) {
    try {
        const user = req.body;
        const verificationCode = crypto.randomInt(0, 1000000);
        user.verificationCode = verificationCode;
        const addedUser = await userService.createUser(user);
        await rpcPublisher.sendToQueue(process.env.SEND_VERIFICATION_MAIL_WORKER, {email: addedUser.email, verificationCode});
        return res.status(200).json({message: "Check Email For Verification", user: addedUser});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
       
}

export async function signIn(req, res) {
    try {
        const user = req.body;
        const signedInUser = await userService.getUser(user);
        if(!signedInUser) {
            return res.status(404).json({message: "User doesnt exist"});
        }
        const jwtToken = await signJwt({userId: signedInUser._id});
        res.setHeader('Authorization', `Bearer ${jwtToken}`); 
        return res.status(200).json(signedInUser);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
       
}



function getUserId(req) {
    const token = req.headers['authorization'].split('Bearer ')[1];
    return getPayload(token).userId;
}