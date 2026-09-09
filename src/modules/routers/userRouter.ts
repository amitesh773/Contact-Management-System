import Router from "express";
const router = Router();
import { singup, login } from "../controllers/userController.js";

router.post("/singup",singup)
router.post("/login",login)



export default router