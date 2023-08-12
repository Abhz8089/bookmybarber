import express from "express";
const router = express.Router()

import { registerUser,submitOtp,clientResendOtp ,clientLogin} from "../Controllers/clientController.js";




router.post("/register", registerUser);
router.post("/clientOtp",submitOtp);
router.post("/resendOtp",clientResendOtp);
router.post('/login',clientLogin)


export default router;