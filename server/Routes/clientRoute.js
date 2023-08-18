import express from "express";
const router = express.Router()

import { registerUser,submitOtp,clientResendOtp ,clientLogin,changePassword,fClOtp,updatePassword} from "../Controllers/clientController.js";




router.post("/register", registerUser);
router.post("/clientOtp",submitOtp);
router.post("/resendOtp",clientResendOtp);
router.post('/login',clientLogin)
router.post('/chPassword',changePassword);
router.post("/fClOtp",fClOtp);
router.post("/subPassword",updatePassword);


export default router;