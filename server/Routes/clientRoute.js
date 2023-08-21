import express from "express";
const router = express.Router();
import userAuth from "../Middlewares/useAuth.js"
import {
  registerUser,
  submitOtp,
  clientResendOtp,
  clientLogin,
  changePassword,
  fClOtp,
  updatePassword,
  clientLogout,
  gClientLogin,
  getHome
} from "../Controllers/clientController.js";


router.post("/register", registerUser);
router.post("/clientOtp", submitOtp);
router.post("/resendOtp", clientResendOtp);
router.post("/login", clientLogin);
router.post("/googleLogin", gClientLogin);
router.post("/chPassword", changePassword);
router.post("/fClOtp", fClOtp);
router.post("/subPassword", updatePassword);
router.post("/logout", clientLogout);

router.get('/',userAuth,getHome);

export default router;
