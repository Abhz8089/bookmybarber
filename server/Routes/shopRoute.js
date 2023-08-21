import express from "express";

const router = express.Router();

import {
  ShopRegister,
  submitOtpShop,
  shopResendOtp,
  shopLogin,updatePassword,
  fShOtp,updatedPassword,shopLogout
} from "../Controllers/shopController.js";



router.post("/sRegister", ShopRegister);
router.post("/shopOtp",submitOtpShop)
router.post("/shopResendOtp", shopResendOtp);
router.post('/sLogin',shopLogin);
router.post("/chPassword", updatePassword);
router.post("/FShOTP", fShOtp);
router.post("/sSubPassword", updatedPassword);
router.post("/sLogout", shopLogout);

export default router;