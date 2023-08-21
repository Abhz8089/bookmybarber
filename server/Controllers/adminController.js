import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../Helpers/hashing.js";
import Admin from '../Models/adminModel.js'
import Shop from '../Models/shopModel.js'
import Client from '../Models/clientModel.js'
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

const getBeauticians = async(req,res) => {
    console.log('ok')
  try {
    let bDatas = await Shop.find()
   
    if(!bDatas){
        return res.json({error:'Network problem please try after few second'})
    }
    return res.json(bDatas)
  } catch (error) {
    console.log(error)
    return res.json({error:'Something went wrong'})
  }
}


const getClients = async (req, res) => {
 
  try {
    let cDatas = await Client.find();

    if (!cDatas) {
      return res.json({ error: "Network problem please try after few second" });
    }
    return res.json(cDatas);
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something went wrong" });
  }
};

const changeAccess =async(req,res) => {
    
    try {
        const {id}= req.body
         const beautician = await Shop.findById({_id:id});
    
         
         beautician.access = !beautician.access;
    
          await beautician.save();

        const updatedData = await Shop.find()
        
        return res.json(updatedData)
    } catch (error) {
        console.log(error)
        
    }
}
const clientChangeAccess = async (req, res) => {
  try {
    const { id } = req.body;
    const shop = await Client.findById({ _id: id });

    shop.isBlock = !shop.isBlock;

    await shop.save();

    const updatedData = await Client.find();

    return res.json(updatedData);
  } catch (error) {
    console.log(error);
  }
};



const adminLogout = async(req,res) => {
     let token = await getTokenForAdmin(req);
    res.setHeader(
      "Set-Cookie",
      `admin=${token}; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    );
    res.json({success:'Logout successful'})
}

export { adminLogin, getBeauticians, changeAccess, adminLogout, getClients ,clientChangeAccess};