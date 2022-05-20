import { UserEntity } from "../models/user.model.js";
export async function createUser(user) {
    try {
         return await UserEntity.create(user);
    } catch (error) {
        throw error;
    }
}

export async function getUser(email) {
    try {
         return await UserEntity.findOne({email}).lean();
    } catch (error) {
        throw error;
    }
}
export async function getUserById(userId) {
    try {
         return await UserEntity.findById(userId).lean();
    } catch (error) {
        throw error;
    }
}
