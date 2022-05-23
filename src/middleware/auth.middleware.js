import jwt from 'jsonwebtoken';

export function authorization(req, res, next){
    try {
        const jwtPublicKey =fs.readFileSync(process.env.PUBLIC_KEY_PATH, 'utf8');
        const token = req.header('authorization').split('Bearer ')[1];
        jwt.verify(token, jwtPublicKey);
        next();
      } catch (error) {
        res.status(401).json({message:"unauthorized"});
      }
}
