import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)


router.route("/login").post(loginUser)


//secured routes 

router.route("/logout").post(verifyJWT,logoutUser)


export default router;

// Default Export (export default router): A module can only have one default export. Because there is only one default thing being exported, JavaScript knows exactly what you mean regardless of what name you give it upon import.

//When you export something as export default, you can import it using any name you choose. You are not required to name it router.