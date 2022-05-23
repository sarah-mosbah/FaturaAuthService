import mongoose from "mongoose";
import { UserEntity } from "../models/user.model.js";
export function createUser(user) {
    try {
         return UserEntity.create(user);
    } catch (error) {
        throw error;
    }
}

export function getUser(email) {
    try {
         return  UserEntity.findOne({email}).lean();
    } catch (error) {
        throw error;
    }
}
export function getUserById(userId) {
    try {
        const objectId = mongoose.Types.ObjectId(userId);
         return UserEntity.findById(objectId);
    } catch (error) {
        throw error;
    }
}

export function updateUser(user) {
    try {
         return UserEntity.findByIdAndRemove({_id: user._id}, {
             $set: user
         });
    } catch (error) {
        throw error;
    }
}

