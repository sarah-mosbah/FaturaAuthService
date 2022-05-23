import jwt from 'jsonwebtoken';
import fs from 'fs';
import moment from 'moment';
export function signJwt(userData) {
    const jwtPrivateKey =fs.readFileSync(new URL(process.env.SECRET_KEY_PATH, import.meta.url), 'utf8');
    const data = {
        expiresIn: moment(new Date()).add(10,'minutes'),
        userId: userData.user._id,
        permissions: userData.permissions,
    }
    return jwt.sign(data, jwtPrivateKey);
}

export function getPayload(token) {
    return jwt.decode(token);
}