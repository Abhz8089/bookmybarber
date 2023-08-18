import express from "express";
const router = express.Router();
import {adminLogin} from '../Controllers/adminController.js'




router.post("/admin",adminLogin)

export default router