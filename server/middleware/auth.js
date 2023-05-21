import Jwt from "jsonwebtoken"
import ENV from './../config.js'
export default async function Auth(req, res, next) {
    try {
        // Access authorize header to validate request
        const token = req.headers.authorization.split(`\"`)[1]

        // retrive the logged user from token 
        const decodedToken = await Jwt.verify(token,ENV.SECRET)
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: "Authentication Failed" })
    }
}

export function localVariable(req,res,next){
    req.app.locals={
        OTP:null,
        resetSession:false
    }
    next()
}