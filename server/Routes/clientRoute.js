import express from "express";
const router = express.Router();
import userAuth from "../Middlewares/clientAuth.js"
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
  getHome,
  getUser,
  searchShop,
  ifUser,
} from "../Controllers/clientController.js";

import {
  successBook,
  bookedDetails,
  cancelBooking,
  getNotification,
} from "../Controllers/successController.js";

import {chat,getChatsUser } from '../Controllers/chatController.js'


router.post("/register", registerUser);
router.post("/clientOtp", submitOtp);
router.post("/resendOtp", clientResendOtp);
router.post("/login", clientLogin);
router.post("/googleLogin", gClientLogin);
router.post("/chPassword", changePassword);
router.post("/fClOtp", fClOtp);
router.post("/subPassword", updatePassword);
router.post("/logout", clientLogout);
router.post('/search',searchShop);

router.get('/',userAuth,getHome);
router.get('/getUser',getUser);
router.get("/ifUser",ifUser);

//bookingsuccess
router.post("/booked",successBook);
router.get("/details",userAuth,bookedDetails);
router.post('/cancel',cancelBooking);
router.get("/getNotification",getNotification);

//-----getstyle page-------------

//message-------
router.post("/sendedMsg",chat);
router.get("/getChats",getChatsUser);

export default router;
