
import { Router } from "express";
import { loginUser, registerUser } from "../crontrollers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";



const router = Router()



/*
**  routes declaration
*/

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 

        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)
    
// router.route("/login").post(loginUser)
// console.log("router: ", router);



router.route("/login").post(loginUser)

/*
**  secured routes
*/

router.route("/login").post(verifyJwt, loginUser)


export default router


