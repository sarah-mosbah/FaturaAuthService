import jwt from 'jsonwebtoken';


export function signJwt(userData) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const data = {
        time: Date(),
        userId: userData.userId,
    }
    return jwt.sign(data, jwtSecretKey);
}

export function getPayload(token) {
    return jwt.decode(token);
}