import Router from "express";
const router = Router();
import { createContactGroup,allContactGroup,singleContactGroup , updateContactGroup, deleteContactGroup} from "../controllers/contactGroupController.js";
import { verifytoken } from "../../middleware/authMiddleware.js";

router.post("/create",verifytoken,createContactGroup)
router.get("/all",verifytoken,allContactGroup)
router.get("/single/:id", verifytoken,singleContactGroup)
router.patch("/update/:id",verifytoken,updateContactGroup)
router.delete("/delete/:id",verifytoken,deleteContactGroup)


export default router