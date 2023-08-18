import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../Helpers/hashing.js";
import Admin from '../Models/adminModel.js'
import {createTokenForAdmin,getTokenForAdmin } from "../utils/generateToken.js";

const adminLogin = async (req,res) => {
    try {
        const {email,password} = req.body;
        let emailExist = await Admin.findOne({email})
        if(!emailExist){
            return res.json({error:'You are not an admin'})
        }
        let match = await comparePassword(password,emailExist.password)
        if(match){

            createTokenForAdmin(res,{email:emailExist.email,userName:emailExist.userName,userId:emailExist._id})
             const admin = {
               userName: emailExist.userName,
               email: emailExist.email,
               id: emailExist._id,
             };

             return res.json(admin)
           
        }

        if(!match){
            return res.json({error:'Password did not match'})
        }
    } catch (error) {
        return res.json({error:"something went wrong"})
    }

}

export {
    adminLogin
}