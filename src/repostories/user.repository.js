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
        return UserEntity.findById(userId);
    } catch (error) {
        throw error;
    }
}

export function updateUser(user) {
    try {
         return UserEntity.findByIdAndUpdate({_id: user._id}, {
             $set: user
         });
    } catch (error) {
        throw error;
    }
}

export function updateUserRoles(userId, roles) {
    try {
        return UserEntity.findByIdAndUpdate({_id: userId}, {
             $set: {roles}
        }, {new: true});
    } catch (error) {
        throw error;
    }
}

