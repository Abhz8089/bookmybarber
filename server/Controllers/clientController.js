import Client from "../Models/clientModel.js";
import { comparePassword,hashPassword } from "../Helpers/hashing.js";

export async function registerUser(req, res) {
    try {
        const {userName,email,password,cPassword} = req.body;

        //check if name is entered
        if(!userName){
            return res.json({
                error:'User name is required'
            })
        }

        //if password is not good
        if(!password || password.length<6) {
            return res.json({
                error : 'password is required and should be atleast 6 characters long'
            })
        }

        //check email
        const exist = await Client.findOne({email})
        if(exist) {
            return res.json({
                error : 'Email is taken already'
            })
        }

        //compare passwords
        if(password !== cPassword){
         return res.json({
            error: 'Confirm password is didnt Match'
         })
        }

        
        // const hashedPassword = await hashPassword(password)
        // const hashedCPassword = await hashPassword(cPassword)

        // //create user in database
        // const client = await Client.create({
        //     userName,
        //     email,
        //     password : hashedPassword,
        //     cPassword:hashedCPassword

        // })
        return res.json({success :'success'})
        

        

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occured while registering user.' })
    }
}

export async function loginUser(req,res){
    try{

    } catch (error){
        console.log(error)

    }
}