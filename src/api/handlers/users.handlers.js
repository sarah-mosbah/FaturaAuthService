import * as userService from '../../services/user.service.js';
import * as roleService from '../../services/roles.service.js';
import crypto from 'crypto';
import { signJwt } from '../../utils/jwt.utils.js';
import { getPayload } from '../../utils/jwt.utils.js';
import * as rpcPublisher from '../../amqp/publisher.js';
import { GENERAL_USER, VERIRFIED } from '../../utils/rolename.const.js';

export async function createUser(req, res) {
    try {
        const user = req.body;
        const verificationCode = crypto.randomInt(0, 1000000);
        user.verificationCode = verificationCode;
        const verifiedRole = await roleService.getRoleByRoleName(VERIRFIED);
        user.roles = [verifiedRole._id];
        const addedUser = await userService.createUser(user);
        const token = signJwt({user:addedUser, permissions: verifiedRole.permissions});
        res.cookie("token", token);
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
        if(!signedInUser.isVerified) {
            return res.status(401).json({message: "User is Not Verified"});
        }
        const roles = await roleService.getRoles(signedInUser.roles);
        let permissions = [];
        roles.forEach((role) => {
            permissions = [...permissions, role.permissions];
        })
        const jwtToken = signJwt({user: signedInUser, permissions});
        res.cookie('token', jwtToken);
        return res.status(200).json(signedInUser);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
       
}

export async function verify(req, res)  {
    try {
       const verificationCode = req.body.verificationCode;
       const userId = getPayload(req.cookies.token).userId;
       const user = await userService.getUserById(userId);
       if(!user) {
         return res.status(404).json({message: 'User not found'});
       }
       if(user.isVerified) {
         return res.status(200).json({message: 'User Already Verified'});
       }
       if(user.verificationCode !== verificationCode) {
          return res.status(400).json({message: 'Verification Code is invalid'});
       }
       const generalRole = await roleService.getRoleByRoleName(GENERAL_USER);
       const updateUser = await userService.updateUserIsVerified(user, generalRole._id);
       const token = signJwt({user:updateUser, permissions: generalRole.permissions});
       res.cookie("token", token);
       return res.status(200).json({message: "User verified successfully"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export async function logOut(req, res)  {
    try {
        res.clearCookie('token');
       return res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
