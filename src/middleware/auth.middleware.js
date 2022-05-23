import jwt from 'jsonwebtoken';
import {getPayload} from '../utils/jwt.utils.js';
import fs from 'fs';
export const authorization = (allowedPermission) => {
  return (req, res, next) => {
    try {
      if(!req.cookies || !req.cookies.token) {
        return res.status(401).json({message:"unauthorized"});
      }
      const jwtPublicKey =fs.readFileSync(new URL(process.env.SECRET_KEY_PATH, import.meta.url), 'utf8');
      const token = req.cookies.token;
      jwt.verify(token, jwtPublicKey, { algorithm:  ["RS256"]});
      const payload = getPayload(token);
      if(new Date(payload.expiresIn) > new Date()) {
        res.clearCookie('token');
        return res.status(401).json({message:"Token Expired"});
      }
      if(!payload.permissions) {
        return res.status(401).json({message:"unauthorized"});
      }
      const [permission] = Object.keys(allowedPermission);
      if(!payload.permissions[permission] || 
        payload.permissions[permission] !== allowedPermission[permission]
        ) {
         return res.status(401).json({message:"unauthorized"});
      }
      next();
    } catch (error) {
      return  res.status(401).json({message:"unauthorized"});
    }
  }
}
