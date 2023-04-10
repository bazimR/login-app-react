import Jwt from "jsonwebtoken"
export default async function Auth(req, res, next) {
    try {
        // Access authorize header to validate request
        const token = req.headers.authorization.split(`\"`)[1]

        // retrive the logged user from token 
        const decodedToken = await Jwt.verify(token,"secret")
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: "Authentication Failed" })
    }
}

// export async function otp