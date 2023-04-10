import { Router } from 'express';
const router = Router()

// import all controller
import * as controller from './../controllers/appController.js'
import Auth from '../middleware/auth.js';

// POST ROUTE
router.route('/register').post(controller.register) // register user
// router.route('/registerMail').post() //register mail
router.route('/authenticate').post((req,res)=>res.end()) //auth user
router.route('/login').post(controller.verifyUser,controller.login) //login app
// GET ROUTE
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.generateOTP) // generate OTP
router.route('/verifyOTP').get(controller.verifyOTP) // verify OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables

// PUT ROUTE
router.route('/updateuser').put(Auth,controller.updateUser)// is use to update user profile
router.route('/resetPassword').put(controller.resetPassword)// use to reset password

export default router;