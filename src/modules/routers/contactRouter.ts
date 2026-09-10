import Router from "express";
const router = Router();
import {create} from "../controllers/contactController.js";
import { verifytoken } from "../../middleware/authMiddleware.js";

router.post("/create",verifytoken,create)


export default router