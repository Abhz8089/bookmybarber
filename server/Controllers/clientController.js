import jwt from "jsonwebtoken";

import Client from "../Models/clientModel.js";
import Shops from "../Models/shopModel.js";

import gClient from "../Models/googleClientModel.js";
import { comparePassword, hashPassword } from "../Helpers/hashing.js";
import { otp, transporter } from "../Helpers/otpCreate.js";
import {createTokenForUser as createToken, getTokenForUser as getToken } from "../utils/generateToken.js";
import { ifUserHave } from "../utils/ifUser.js";
import { getData } from "../utils/getDetails.js";
import client from "../Models/clientModel.js";

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

    let sendedOtp = otp();
    

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
    return res
      .status(500)
      .json({ error: "An error occured while registering user." });
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

      if (userOtp !== decodedToken.data.otp || timeDifferenceInMinutes > 1) {
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
      res.status(500).json({ error: "An error occurred while otp submit." });
    }
  }
};

//---------------------------------------------------------------------------------
const clientResendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    let sendedOtp = await otp();

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
    return res.json({ success: "otp successfully sended" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};

//----------------client login---------------------------

const clientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    let emailExist = await Client.findOne({ email });
  
    if (emailExist.isBlock) {
      return res.json({
        error: "You do not have permission to access this website.",
      });
    }
     
    if (!emailExist) {
      
      return res.json({ error: "User Not found please sign up" });
    } else {
      let match = await comparePassword(password, emailExist.password);
      if (match) {
        createToken(res, {
          email: emailExist.email,
          userName: emailExist.userName,
          userId: emailExist._id,
        });

        const client = {
          userName: emailExist.userName,
          email: emailExist.email,
          id: emailExist._id,
        };

        return res.json(client);
      }

      if (!match) {
        return res.json({ error: "Password did not match" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "something went wrong" });
  }
};

//--------------google client login-------------------------------
// const gClientLogin =async (req,res) => {
//   try {
//     const {gName,gEmail} =req.body
//     let gClientDetails = await gClient.find({email:gEmail})

//     if(!gClientDetails.length){
//       console.log('enter')
//         const client = await gClient.create({
//           userName:gName,
//           email : gEmail,

//         });
//       const resultData ={ name:client.userName,email:client.email}
//       return res.json(resultData);

//     }else{
//      return res.json({gName,gEmail})
//     }

//   } catch (error) {
//     console.log("Error in google login in server line 212",error)
//   }

// }

const gClientLogin = async (req, res) => {
  try {
    const { gName, gEmail } = req.body;
    let gClientDetails = await Client.find({ email: gEmail });

    if (!gClientDetails.length) {
      const client = await Client.create({
        userName: gName,
        email: gEmail,
      });

      const resultData = { name: client.userName, email: client.email };
      createToken(res, resultData);
      return res.json(resultData);
    } else {
      // if (gClientDetails[0].isBlock) {
      //   console.log('blocked')
      // }
     
      if (gClientDetails[0].isBlock) {
        return res.json({
          error: "you do not have permission to enter this website",
        });
      }
      createToken(res, { gName, gEmail });
      return res.json({ gName, gEmail });
    }
  } catch (error) {
    console.log("Error in google login in server line 212", error);
  }
};

//---------------change password ---------------------------------

const changePassword = async (req, res) => {
  try {
    const email = req.body.email;
    let emailExist = await Client.findOne({ email });

    if (!emailExist) {
      return res.json({ error: "user not found" });
    }

    let sendedOtp = otp();
    console.log(sendedOtp, " first otp");

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

    return res.json({ email: email });
  } catch (error) {
    console.log("error in change password 215", error);
    return res.json({ error: "something went wrong" });
  }
};

const fClOtp = async (req, res) => {
  try {
    let token = await getToken(req);
    if (token) {
      const { email, userOtp } = req.body;

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const decodedTokenTime = new Date(decodedToken.data.time);

      const enterOtpTime = new Date();

      const timeDifference = Math.abs(enterOtpTime - decodedTokenTime);

      const timeDifferenceInMinutes = timeDifference / 60000;

      console.log(userOtp);
      console.log(decodedToken.data.otp);

      console.log(timeDifferenceInMinutes);

      if (userOtp !== decodedToken.data.otp || timeDifferenceInMinutes > 1) {
        return res.json({ error: "you are entered a wrong Otp" });
      } else {
        return res.json({ success: "success" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something went wrong" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { email, passw, cPassw } = req.body;

    if (passw.trim() == "" || cPassw.trim() == "") {
      return res.json({ error: "Password is empty" });
    }

    if (passw.length < 6) {
      return res.json({ error: "Password must be 6 character" });
    }

    if (passw !== cPassw) {
      return res.json({ error: "Confirm password is not match" });
    }

    const passwBcrypt = await hashPassword(passw);
    const cPasswBcrypt = await hashPassword(cPassw);

    let userDetails = await Client.findOneAndUpdate(
      { email },
      {
        $set: { password: passwBcrypt, cPassword: cPasswBcrypt },
      },
      { new: true }
    );

    if (!userDetails) {
      return res.json({ error: "failed to update password try again later" });
    }
    return res.json({ userDetails });
  } catch (error) {
    console.log("Error in client controller 289", error);
    return res.json({ error: "Something went wrong" });
  }
};

//get home page---------------------------------------

const getHome = async (req, res) => {
  try {
    return res.json({ success: "successfully entered" });
  } catch (error) {
    console.log(error);
    return res.json("error in getHome line 392", error);
  }
};

const clientLogout = async (req, res) => {
  let token = await getToken(req);
  res.setHeader(
    "Set-Cookie",
    `user=${token}; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );
  res.json({ success: "Logout successful" });
};
//-----getUserDetails --------------------

const getUser = async (req, res) => {
  try {
    const token = getToken(req);

    if (!token) {
      return res.json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let Data = decoded.data;
      return res.json({ Data });
    } catch (error) {
      return res.json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.json("error in getHome line 392", error);
  }
};

//search shop using name and pincode
const searchShop = async (req, res) => {
  const { pincode, name } = req.body;

  if (!pincode && !name) {
    return res.json({ error: "Search shops using proper keys " });
  }
  if (pincode && !name) {
    const stringZipcode = pincode.toString();
    const pinCodeRegex = /^[1-9][0-9]{5}$/;
    const validZip = pinCodeRegex.test(stringZipcode);

    if (!validZip) {
      return res.json({ error: "Enter valid pincode" });
    }
    const shops = await Shops.find(
      { zipcode: pincode, access: true },
      { businessName: 1, address: 1, phoneNumber: 1, zipcode: 1, _id: 1,photos:1 }
    );
    if (shops.length) {
      return res.json(shops);
    } else {
      return res.json({
        error:
          "Sorry, we couldn't find any shops matching the details you provided.",
      });
    }
  }

  if (!pincode && name) {
    const regexPattern = new RegExp(name, "i");
    const shops = await Shops.find(
      { businessName: { $regex: regexPattern } ,access:true},
      { businessName: 1, address: 1, phoneNumber: 1, zipcode: 1, _id: 1 }
    );

    if (shops.length) {
      return res.json(shops);
    } else {
      return res.json({
        error:
          "Sorry, we couldn't find any shops matching the details you provided.",
      });
    }
  }
  const shops = await Shops.find(
    { businessName: name, access: true },
    { businessName: 1, address: 1, phoneNumber: 1, zipcode: 1, _id: 1 }
  );

  if (shops.length) {
   
    return res.json(shops);
  } else {
    return res.json({
      error:
        "Sorry, we couldn't find any shops matching the details you provided.",
    });
  }
};

const ifUser = async(req,res) => {
  try {
    const result = await ifUserHave(req)
   
    if(!result){
      return res.json({error:"User logged out please re login"})
    }else{
      const details = getData(result)
     

      let userData
      if(details && !details.userId ){
        
          userData = await client.find({ email: details.gEmail });
      }else{
   userData = await client.find({ _id: details.userId });
 
    
      }
      
    
      if(userData[0].isBlock){
        return res.json({error:'Sorry you cannot enter this website....'})
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export {
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
  ifUser
};
