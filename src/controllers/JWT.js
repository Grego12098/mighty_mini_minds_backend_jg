import jwt from "jsonwebtoken";
import {sign, verify} from "jsonwebtoken";
import{JWT_SECRET} from "../config.js";

export default function createTokens(user){
    const accessToken =  sign({userId: user.uuid, username: user.username, }, JWT_SECRET, {expiresIn: '1h'});
    return accessToken
}

export default function validateToken(req, res, next){
    const accessToken = req.cookies["access-token"];
    if(!accessToken) return res.status(400).json({message: "User not authenticated"});
    try{
        const validToken = verify(accessToken, JWT_SECRET);
        if(validToken){
            req.authenticated = true;
            return next();
        }
    }catch(error){
        return res.status(400).json({ message: error});
    }
}