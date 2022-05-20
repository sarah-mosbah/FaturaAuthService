import { UserPointsEntity } from "../models/userPoint.model.js";


export async function createNewUserPoints(userId) {
    try {
       return await UserPointsEntity.create({userId});
    } catch (error) {
        throw error;
    }
}

export async function getUserPoints(userId) {
    try {
       return await UserPointsEntity.findOne({userId});
    } catch (error) {
        throw error;
    }
}