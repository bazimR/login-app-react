import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator'
import ENV from "./../config.js"

// Middleware for verifying user
export async function verifyUser(req, res, next) {
    try {
        const { username } = req.method == "GET" ? req.query : req.body;
        // checking user existence
        const user = await UserModel.findOne({ username })
        if (!user) {
            return res.status(404).send({ error: "Can't find User!" });
        }
        else {
            next();
        }
    } catch (error) {
        return res.status(404).send({ error: "authentication error" });
    }
}



// POST:api/register
export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body

        const existUsername = new Promise(async (resolve, reject) => {
            const user = await UserModel.findOne({ username })
            if (user) reject({ error: "Please provide a different Username" })
            resolve()
        })
        const existEmail = new Promise(async (resolve, reject) => {
            const userEmail = await UserModel.findOne({ email })
            if (userEmail) reject({ error: "Please provide a different Email" })
            resolve()
        })
        Promise.all([existUsername, existEmail])
            .then(() => {
                if (password) {
                    bcrypt.hash(password, 10)
                        .then((hashPassword) => {
                            const user = new UserModel({
                                username,
                                password: hashPassword,
                                profile: profile || '',
                                email
                            })
                            // return save result as response
                            user.save().then((result) => {
                                res.status(201).send({ result, msg: "User registered succesfully" })
                            }).catch((err) => {
                                res.status(500).send({ err })
                            });
                        })
                        .catch(error => {
                            return res.status(500).send({ error: "Unable to hash password" })
                        })
                }
            })
            .catch(error => {
                return res.status(500).send({ errorMsg: "promise all", error });
            })
    }
    catch (error) {
        return res.status(500).send({ error: "try catch" })
    }
}
// POST:api/login
export async function login(req, res) {
    const { username, password } = req.body;
    try {
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if (!passwordCheck) return res.status(400).send({ error: "Dont hava a password" })
                        // creating JWT Token
                        const token = Jwt.sign({
                            userId: user._id,
                            username: user.username,

                        }, ENV.SECRET, { expiresIn: "24h" });

                        return res.status(201).send({
                            msg: "Login succesful...!",
                            username: user.username,
                            token
                        })
                    })
                    .catch(err => {
                        return res.status(400).send({ err: "password does not match" })
                    })
            })
            .catch(err => {
                return res.status(404).send({ err: "username not found" })
            })
    }
    catch (err) {
        res.status(500).send(err)
    }
}

// GET:api/user/username
export async function getUser(req, res) {
    const { username } = req.params;
    try {
        if (!username) return res.status(501).send({ error: "Invalid Username" })
        const user = await UserModel.findOne({ username })
        if (!user) return res.status(501).send({ error: "Couldn't Find the User" })
        const { password, ...rest } = Object.assign({}, user.toJSON())
        return res.status(201).send(rest)

    } catch (error) {
        return res.status(404).send({ error: "Cannot find user data" })
    }
}

// PUT:api/updateuser
export async function updateUser(req, res) {
    try {
        // const id = req.query.id;
        const { userId } = req.user
        if (userId) {
            const body = req.body;

            UserModel.updateOne({ _id: userId }, body).then(() => {
                return res.status(201).send({ msg: "Record Updated" })
            })
                .catch((err) => {
                    return res.status(404).send({ error: "Updating failed" })
                })


        }
        else {
            return res.status(401).send({ error: "User Not Found" })
        }
    } catch (error) {
        return res.status(401).send({ error })
    }
}

// GET:api/generateOTP
export async function generateOTP(req, res) {
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(201).send({ code: req.app.locals.OTP })
}

// GET:api/verifyOTP
export async function verifyOTP(req, res) {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(201).send({ msg: 'Verify Successfully!' })

    }
    return res.status(401).send({ error: "Invalid OTP" })
}

// GET:api/createResetSession
export async function createResetSession(req, res) {
    if (req.app.locals.resetSession) {
        req.app.locals.resetSession = false //allow access only once
        return res.status(201).send({ msg: "Access granted" })
    }
    return res.status(440).send({ error: "session expired!" })
}

// PUT:api/resetPassword
export async function resetPassword(req, res) {
    try {
        const { username, password } = req.body
    } catch (error) {
        return res.status(401).send({ error })
    }
}
// POST api/admin/login

export async function adminLogin(req, res) {
    const cred = {
        username: "admin",
        password: "12345@"
    }
    const { username, password } = req.body
    try {
        if (username === cred.username && password === cred.password) {
            const adminToken = Jwt.sign({
                username,
                password,
            }, ENV.SECRET, { expiresIn: '24h' })
            res.status(200).send({
                msg: "admin login successful",
                adminToken
            })
        }
        else {
            res.status(404).send({ error: "username and password wont match!" })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
// get all users from db
export async function getAllUsers(req, res) {
    try {
        const data = await UserModel.find()
        if (!data) { res.status(404).send({ error: "Cannot get users details" }) }
        else {res.status(201).send(data) }
    } catch (error) {
        res.status(404).send(error)
    }
}

// remove user 
export async function removedUser(req,res){
    const {_id}= req.body
    try {
        const removedUser = await UserModel.remove({_id})
        console.log(removedUser);
    } catch (error) {
        res.status(404).send(error)
    }
}