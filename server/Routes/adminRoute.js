import express from "express";
const router = express.Router();
import {adminLogin,getBeauticians,changeAccess,adminLogout,getClients,clientChangeAccess} from '../Controllers/adminController.js'
import adminAuthMiddleware from '../Middlewares/adminAuth.js'




router.post("/admin",adminLogin)
router.get("/beautician",adminAuthMiddleware,getBeauticians);
router.get("/clients",adminAuthMiddleware,getClients);
router.post("/update-access", changeAccess);
router.post("/update-client-access",clientChangeAccess);
router.post("/adminLogout",adminLogout);
export default router