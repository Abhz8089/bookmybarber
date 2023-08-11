import express from "express";
const router = express.Router()

import { registerUser,loginUser } from "../Controllers/clientController.js";




router.post('/register',registerUser)



export default router;