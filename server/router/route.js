import { Router } from 'express';
const router = Router()

// import all controller
import * as controller from './../controllers/appController.js'
import Auth, { localVariable } from '../middleware/auth.js';
import { registerMail } from '../controllers/mailer.js'

// POST ROUTE
router.route('/register').post(controller.register) // register user
router.route('/registerMail').post(registerMail) //register mail
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()) //auth user
router.route('/login').post(controller.verifyUser, controller.login) //login app
router.route('/admin/login').post(controller.adminLogin) //admin login 
router.route('/removeuser').post(controller.removedUser) //remove user from db 
// GET ROUTE
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariable, controller.generateOTP) // generate OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables
router.route('/admin/getusers').get(controller.getAllUsers) //get all users from db

// PUT ROUTE
router.route('/updateuser').put(Auth, controller.updateUser)// is use to update user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword)// use to reset password

export default router;