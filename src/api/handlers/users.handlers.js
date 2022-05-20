import * as userService from '../../services/user.service.js';
import * as userPointsservice from '../../services/userPoints.service.js';
import * as transferService from '../../services/transfer.service.js' 
import { signJwt } from '../../utils/jwt.utils.js';
import { getPayload } from '../../utils/jwt.utils.js';
export async function createUser(req, res) {
    try {
        const user = req.body;
        const addedUser = await userService.createUser(user);
        const userNewPoints = await userPointsservice.createUserPoints(addedUser._id);
        const jwtToken = await signJwt({userId: addedUser._id});
        res.setHeader('Authorization', `Bearer ${jwtToken}`); 
        return res.status(200).json({...addedUser, totalPoints: userNewPoints.points});
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

export async function getUserPoints(req, res) {
    try {
        const userId = getUserId(req);
        const userPoints = await userPointsservice.getUserPoints(userId);
        return res.status(200).json(userPoints)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export async function getUserTransfers(req, res) {
    try {
        const userId = getUserId(req);
        const listOfTransactions =  await transferService.getUserTransferes(userId);
        return res.status(200).json(listOfTransactions);
    } catch (error) {
         return res.status(500).json({message: error.message});
    }
} 

function getUserId(req) {
    const token = req.headers['authorization'].split('Bearer ')[1];
    return getPayload(token).userId;
}