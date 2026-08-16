import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router=Router();

router.route("/register").post(registerUser)






export default router;

// Default Export (export default router): A module can only have one default export. Because there is only one default thing being exported, JavaScript knows exactly what you mean regardless of what name you give it upon import.

//When you export something as export default, you can import it using any name you choose. You are not required to name it router.