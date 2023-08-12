import jwt from "jsonwebtoken";

import Client from "../Models/clientModel.js";
import { comparePassword, hashPassword } from "../Helpers/hashing.js";
import { otp, transporter } from "../Helpers/otpCreate.js";
import { createToken, getToken } from "../utils/generateToken.js";

const registerUser = async (req, res) => {
  try {
    const { userName, email, password, cPassword } = req.body;

    //check if name is entered
    if (!userName || !userName.trim()) {
      return res.json({
        error: "User name is required",
      });
    }

    //if password is not good
    if (!password || password.length < 6 || !password.trim()) {
      return res.json({
        error: "password is required and should be atleast 6 characters long",
      });
    }

    //check email
    const exist = await Client.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken already",
      });
    }

    //compare passwords
    if (password !== cPassword) {
      return res.json({
        error: "Confirm password is didnt Match",
      });
    }

    let sendedOtp = otp()
    console.log(sendedOtp," first otp")

    const mailOptions = {
      from: "bookmybarber@gmail.com",
      to: email,
      text: `Your OTP is   ${sendedOtp}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).send({ error: "Error sending OTP email" });
        client.close();
        return;
      }
    });

    const currentTime = new Date();

    createToken(res, { otp: sendedOtp, time: currentTime });

    return res.json({ success: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured while registering user." });
  }
};

const submitOtp = async (req, res) => {
  let token = await getToken(req);

  if (token) {
    try {
      const { userName, email, password, cPassword, userOtp } = req.body;
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Parse the ISO 8601 formatted timestamp from the token data
      const decodedTokenTime = new Date(decodedToken.data.time);

      const enterOtpTime = new Date();
    

      // Calculate the time difference in milliseconds
      const timeDifference = Math.abs(enterOtpTime - decodedTokenTime);

      // Convert time difference to minutes
      const timeDifferenceInMinutes = timeDifference / 60000;
      

      if (userOtp !== decodedToken.data.otp || timeDifferenceInMinutes > 3) {
        res.json({ error: "you are entered a wrong Otp" });
      } else {
        const hashedPassword = await hashPassword(password);
        const hashedCPassword = await hashPassword(cPassword);

        //create user in database
        const client = await Client.create({
          userName,
          email,
          password: hashedPassword,
          cPassword: hashedCPassword,
        });


        return res.json({ success: "otp matching" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occured while otp submit." });
    }
  }
};
//---------------------------------------------------------------------------------
const clientResendOtp = async(req,res)=> {

  try {
      const { email } = req.body;

      let sendedOtp = await otp()

      console.log(sendedOtp,"second otp")

      const mailOptions = {
        from: "bookmybarber@gmail.com",
        to: email,
        text: `Your OTP is   ${sendedOtp}`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.status(500).send({ error: "Error sending OTP email" });
          client.close();
          return;
        }
      });

      const currentTime = new Date();

      createToken(res, { otp: sendedOtp, time: currentTime });
      res.json({success:'otp succesfully send'})
  } catch (error) {
    res.status(500).json({error:'something went wrong'})
    console.log(error)
  }

        
}

//----------------client login---------------------------

const clientLogin =async(req,res) => {
    try {
        const {email,password} = req.body;
       
        let emailExist = await Client.findOne({email})

        if(!emailExist){
            res.json({error:'User Not found please sign up'})
        }else{
            comparePassword(password,emailExist.password).then((data) =>{
                createToken(res,{email:emailExist.email,userName:emailExist.userName,userId:emailExist._id})
                res.json(data)
            }).catch((error) => {
                res.json({error:'Password did not match'})
            })
        }

    } catch (error) {
        
    }
}

export { registerUser, submitOtp, clientResendOtp,clientLogin };
