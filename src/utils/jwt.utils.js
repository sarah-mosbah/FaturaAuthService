import jwt from 'jsonwebtoken';
import fs from 'fs';
export function signJwt(userData) {
    const jwtPrivateKey =fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8');
    const data = {
        time: Date(),
        userId: userData.userId,
        roles: userData.roles
    }
    return jwt.sign(data, jwtPrivateKey);
}

export function getPayload(token) {
    return jwt.decode(token);
}