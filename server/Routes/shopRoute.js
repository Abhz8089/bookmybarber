import express from "express";

const router = express.Router();
import userAuth from "../Middlewares/useAuth.js";
import { upload } from "../Helpers/multer.js";

import {
  ShopRegister,
  submitOtpShop,
  shopResendOtp,
  shopLogin,
  updatePassword,
  fShOtp,
  updatedPassword,
  shopLogout,uploadFile,getImg
 
} from "../Controllers/shopController.js";

import {
  addEmployee,
  getBookings,
  editAccess,
  getEmployee,
  getSlot,
  editDate,
  deletEmpl,
  
} from "../Controllers/addEmployeeController.js";


import {Bookings } from '../Controllers/successController.js'

router.post("/sRegister", ShopRegister);
router.post("/shopOtp",submitOtpShop)
router.post("/shopResendOtp", shopResendOtp);
router.post('/sLogin',shopLogin);
router.post("/chPassword", updatePassword);
router.post("/FShOTP", fShOtp);
router.post("/sSubPassword", updatedPassword);
router.post("/sLogout", shopLogout);
router.post("/sUpload",upload.array('images',5) ,uploadFile);
router.get("/sGetImg/:id", userAuth, getImg);

//addEmployee route ---------------------------
router.post("/sAddEmployee", addEmployee);
router.get('/sBookings',userAuth,getBookings);
router.post("/sEditAccess",editAccess);
router.post('/getEmployee',getEmployee);
router.post("/getSlot",getSlot);
router.post("/sEditDate",editDate);

router.delete('/delEm/:id',deletEmpl)

//slots details.........................

router.get("/sSchedule",Bookings);

export default router;