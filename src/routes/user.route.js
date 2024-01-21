


import { Router } from "express";
import { registerUser } from "../crontrollers/user.controller.js";



const router = Router()



// routes declaration
router.route("/register").post(registerUser)
// router.route("/login").post(loginUser)



export default router


