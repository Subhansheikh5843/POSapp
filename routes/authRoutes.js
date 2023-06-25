import express from 'express'
import { loginController, registerController } from '../controllers/authController.js'

//Ip limit means at limited time the user will be login the time we will give
import  rateLimit from 'express-rate-limit'




// ip limit 
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})




//router object
const router = express.Router()

//routes

//register \\ post
router.post('/register',limiter,registerController)

//login \\ post
router.post('/login',limiter,loginController)
//export
export default router