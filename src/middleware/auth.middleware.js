import jwt from 'jsonwebtoken';

export function authorization(req, res, next){
    try {
        const token = req.header('authorization').split('Bearer ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
      } catch (error) {
        res.status(401).json({message:"unauthorized"});
      }
}
