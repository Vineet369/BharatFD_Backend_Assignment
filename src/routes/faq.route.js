import {Router} from "express";
import { addFaq, updateFaq, deleteFaq } from "../controllers/adminControls.controller.js";
import { getFaq } from "../controllers/fetchFaqs.controller.js";
import { isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/getFaqs").get(getFaq);
router.route("/add").post(isAdmin,addFaq);
router.route("/update/:faqId").post(isAdmin,updateFaq); 
router.route("/delete/:faqId").get(isAdmin,deleteFaq);  


export default router;