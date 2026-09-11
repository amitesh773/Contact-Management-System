import Router from "express";
const router = Router();
import {createContact, allContact, singleContact, updateContact, deleteContact, searchContact} from "../controllers/contactController.js";
import { verifytoken } from "../../middleware/authMiddleware.js";

router.post("/create",verifytoken,createContact)
router.get("/search",verifytoken,searchContact)
router.get("/all",verifytoken,allContact)
router.get("/single/:id",verifytoken,singleContact)
router.patch("/update/:id",verifytoken,updateContact)
router.delete("/delete/:id",verifytoken,deleteContact)


export default router