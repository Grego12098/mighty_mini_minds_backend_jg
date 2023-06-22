import jwt from "jsonwebtoken";
import{JWT_SECRET} from "../config.js";

export function createTokens(user){
    const accessToken = jwt.sign({userId: user.uuid, username: user.username, auth:true }, JWT_SECRET, {expiresIn: '1h'});
    return accessToken
}

export function validateToken(req, res, next){
    const accessToken = req.cookies["access-token"];
    if(!accessToken) return res.status(400).json({message: "User not authenticated"});
    try{
        const validToken = jwt.verify(accessToken, JWT_SECRET);
        if(validToken){
            req.authenticated = true;
            return next();
        }
    }catch(error){
        return res.status(400).json({ message: error});
    }
}
