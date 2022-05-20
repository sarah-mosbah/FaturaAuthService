import * as userRepository from '../repostories/user.repository.js';
import { hashPassword, validatePassword } from '../utils/password.utils.js';

export  async function createUser(user) {
    try {
    user.password = await hashPassword(user.password);
    const {_id, email, password, username} = await userRepository.createUser(user);
    return {
       _id, email, password, username
    };
    } catch (error) {
        throw error;
    }
}

export  async function getUser(signedInUser) {
    try {
        const user = await userRepository.getUser(signedInUser.email);
       
        if (!user ||  validatePassword(signedInUser.password, user.password)) {
            return null;
        } else {
            return user;
        }
    } catch (error) {
        throw error;
    }
}
export  async function getUserById(userId) {
    try {
      return await userRepository.getUserById(userId);
    } catch (error) {
        throw error;
    }
}
