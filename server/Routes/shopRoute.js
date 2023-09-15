import express from "express";

const router = express.Router();
import userAuth from "../Middlewares/useAuth.js";
import  clientAuth    from '../Middlewares/clientAuth.js'
import { upload } from "../Helpers/multer.js";

import {
  ShopRegister,
  submitOtpShop,
  shopResendOtp,
  shopLogin,
  updatePassword,
  fShOtp,
  updatedPassword,
  shopLogout,
  uploadFile,
  getImg,
  getShopImages,
  deleteShopImg,
  ifShop,
  addLocation,
} from "../Controllers/shopController.js";

import {
  addEmployee,
  getBookings,
  editAccess,
  getEmployee,
  getSlot,
  editDate,
  deletEmpl,
  takeLeave
  
} from "../Controllers/addEmployeeController.js";


import {Bookings } from '../Controllers/successController.js';
import {uploadStyleImage,getStyleImg,getStyleImgInProfile,deleteImgStyle} from '../Controllers/styleController.js';

import {
  addedChatShop,
  getChatShop,
  getDualChat,
} from "../Controllers/chatController.js";


router.post("/sRegister", ShopRegister);
router.post("/shopOtp",submitOtpShop)
router.post("/shopResendOtp", shopResendOtp);
router.post('/sLogin',shopLogin);
router.post("/chPassword", updatePassword);
router.post("/FShOTP", fShOtp);
router.post("/sSubPassword", updatedPassword);
router.post("/sLogout", shopLogout);
router.post("/sUpload",upload.array('images',5) ,uploadFile);

router.get("/sGetImgs/:id", clientAuth, getImg);
router.get("/sGetShopImg", getShopImages);
router.delete("/sDeleteShopImg/:id",deleteShopImg);
router.post("/sAddLocation",addLocation);

router.get("/sIfShop",ifShop);

//addEmployee route ---------------------------
router.post("/sAddEmployee", addEmployee);
router.get('/sBookings',userAuth,getBookings);
router.post("/sEditAccess",editAccess);
router.post('/getEmployee',getEmployee);
router.post("/getSlot",getSlot);
router.post("/sEditDate",editDate);
router.delete('/delEm/:id',deletEmpl);
router.post("/sTakeLeave", takeLeave);

//slots details.........................

router.get("/sSchedule",Bookings);

//style details..............................
router.post("/sStyleImage", upload.single("images", 1), uploadStyleImage);
router.get("/style",getStyleImg);
router.get('/sGetImg',getStyleImgInProfile);
router.delete("/sDeleteImg/:id",deleteImgStyle);

//chat ----
router.post("/sendedShopMsg",addedChatShop);
router.get("/getChatShop",getChatShop);
router.get("/getDualChat",getDualChat);


export default router;