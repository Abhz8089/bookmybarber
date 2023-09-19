import jwt from "jsonwebtoken";
import Shop from "../Models/shopModel.js";

import { comparePassword, hashPassword } from "../Helpers/hashing.js";
import { otp, transporter } from "../Helpers/otpCreate.js";
import { createToken, getToken } from "../utils/generateToken.js";
import { getData } from "../utils/getDetails.js";
import shop from "../Models/shopModel.js";
import {ifShopHave as ifUserHave} from "../utils/ifUser.js";

const ShopRegister = async (req, res) => {
  try {
    let phone = req.body.phoneNumber;
    let zip = req.body.zipCode;
    const numericValue = parseInt(phone.replace(/\D/g, ""));
    const numericZip = parseInt(zip.replace(/\D/g, ""));
    req.body.phoneNumber = numericValue;
    req.body.zipcode = numericZip;

    const {
      userName,
      email,
      password,
      cPassword,
      phoneNumber,
      address,
      businessName,
      zipCode,
    } = req.body;

    //username exist

    if (!userName || userName.trim() === "") {
      return res.json({ error: "Please Enter username" });
    }
    let userNameExist = await Shop.findOne({ userName });

    if (userNameExist) {
      return res.json({
        error: "Username already used please choose another one",
      });
    }

    //email  check
    if (!email) {
      return res.json({ error: "Enter email" });
    }
    let emailExist = await Shop.findOne({ email });
    if (emailExist) {
      return res.json({
        error: "Email is already used please use another one",
      });
    }

    //password validation

    if (!password || password.length < 6) {
      return res.json({ error: "Password must be in 6 characters" });
    }

    if (password !== cPassword) {
      return res.json({ error: "Confirm password is different from password" });
    }

    //validate address

    if (!address || address.trim() === "") {
      return res.json({ error: "Address cannot be empty" });
    }

    //business name validate

    if (!businessName || businessName.trim() === "") {
      return res.json({ error: "Business name required" });
    }

    //validate pincode
    if (!zipCode) {
      return res.json({ error: "zipcode cannot be empty" });
    }
    const stringZipcode = zipCode.toString();
    const pinCodeRegex = /^[1-9][0-9]{5}$/;
    const validZip = pinCodeRegex.test(stringZipcode);

    if (!validZip) {
      return res.json({ error: "Enter valid pincode" });
    }

    //phone number validate

    if (!phoneNumber) {
      return res.json({ error: "Phone number is required" });
    }
    let numberExist = await Shop.findOne({ phoneNumber });

    if (numberExist) {
      return res.json({
        error: "Phone number is exist please choose different one",
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
        return res.status(500).send({ error: "Error sending OTP email" });
        client.close();
        return;
      }
    });

    const currentTime = new Date();

    createToken(res, { otp: sendedOtp, time: currentTime });
    return res.json({ success: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while register." });
  }
};

const submitOtpShop = async (req, res) => {
  let token = await getToken(req);

  if (token) {
    try {
      const {
        userName,
        email,
        password,
        cPassword,
        phoneNumber,
        address,
        businessName,
        zipCode,
        userOtp,
      } = req.body;
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Parse the ISO 8601 formatted timestamp from the token data
      const decodedTokenTime = new Date(decodedToken.data.time);

      const enterOtpTime = new Date();

      // Calculate the time difference in milliseconds
      const timeDifference = Math.abs(enterOtpTime - decodedTokenTime);

      // Convert time difference to minutes
      const timeDifferenceInMinutes = timeDifference / 60000;

      if (userOtp !== decodedToken.data.otp || timeDifferenceInMinutes > 1) {
        res.json({ error: "You are entered a wrong OTP" });
      } else {
        const hashedPassword = await hashPassword(password);
        const hashedCPassword = await hashPassword(cPassword);

        const client = new Shop({
          userName: userName,
          email: email,
          password: hashedPassword,
          cPassword: hashedCPassword,
          businessName: businessName,
          address: address,
          phoneNumber: phoneNumber,
          zipcode: zipCode,
        });

        await client.save();
        return res.json({ success: "otp matching" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while otp submit." });
    }
  }
};

const shopResendOtp = async (req, res) => {
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
    res.json({ success: "otp successfully sended" });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
    console.log(error);
  }
};

//---------------shop Login-------------------------

const shopLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let emailExist = await Shop.findOne({ email });
    let userNameExist = await Shop.findOne({ userName: email });

    if (userNameExist) {
      emailExist = userNameExist;
    }
    if (!emailExist) {
      return res.json({ error: "Shop Not found Please Sign up" });
    } else {
      let match = await comparePassword(password, emailExist.password);

      if (match) {
        if (!emailExist.access) {
          return res.json({
            waiting:
              "Please wait a few seconds while we are checking your details.",
          });
        }

        createToken(res, {
          email: emailExist.email,
          userName: emailExist.userName,
          id: emailExist._id,
          businessName: emailExist.businessName,
          address: emailExist.address,
          phoneNumber: emailExist.phoneNumber,
          zipCode: emailExist.zipCode,
        });
        const shopDetails = {
          email: emailExist.email,
          userName: emailExist.userName,
          id: emailExist._id,
          businessName: emailExist.businessName,
          address: emailExist.address,
          phoneNumber: emailExist.phoneNumber,
          zipCode: emailExist.zipCode,
        };

        return res.json(shopDetails);
      }

      if (!match) {
        return res.json({ error: "Password did not match" });
      }
    }
  } catch (error) {
    console.log(error);

    return res.json({ error: "Something went wrong" });
  }
};

//shop forgot password step 1

const updatePassword = async (req, res) => {
  try {
    let { email } = req.body;
    let shopDetails = await Shop.findOne({ email });

    let shopDetailsUsingUserName = await Shop.findOne({ userName: email });
    if (shopDetailsUsingUserName) {
      shopDetails = shopDetailsUsingUserName;
      email = shopDetailsUsingUserName.email;
    }
    if (!shopDetails) {
      return res.json({ error: "Please enter valid email or userName" });
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

    return res.json({ email: email });
  } catch (error) {
    console.log("Error in change Password 322", error);
    return res.json({ error: "Something went wrong" });
  }
};

//confirm otp for update password

const fShOtp = async (req, res) => {
  try {
    let token = await getToken(req);
    if (token) {
      const { email, userOtp } = req.body;

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const decodedTokenTime = new Date(decodedToken.data.time);

      const enterOtpTime = new Date();

      const timeDifference = Math.abs(enterOtpTime - decodedTokenTime);

      const timeDifferenceInMinutes = timeDifference / 60000;

    

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

const updatedPassword = async (req, res) => {

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

    const userAvil = await Shop.findOne({ email });
    if (!userAvil) {
      const userAvail = await Shop.findOne({ userName: email });
      email = userAvail.email;
    }

    let userDetails = await Shop.findOneAndUpdate(
      { email },
      {
        $set: { password: passwBcrypt, cPassword: cPasswBcrypt },
      },
      { new: true }
    );

    if (!userDetails) {
      return res.json({
        error: "failed to update password try again later",
      });
    }
    return res.json({ userDetails });
  } catch (error) {
    console.log("Error in client controller 289", error);
    return res.json({ error: "something went wrong" });
  }
};

const uploadFile = async (req,res) => {
  console.log('(((((')
  try {
   
    if(!req.files.length){
      return res.json({error:'Chose images'})
    }
   
    const filePaths = req.files.map((file) => file.filename);
    const token = getToken(req)
    const data = getData(token)
   
    
   const updatedShop = await shop.findOneAndUpdate(
     { _id: data.id },
     { $push: { photos: { $each: filePaths } } },
     { new: true } 
   );
    
   if (!updatedShop) {
     return res.json({ error: "Shop not found" });
   }
   
   return res.json(updatedShop)
    
  } catch (error) {
  console.log(error)   
  }
   
 
}



const getImg = async(req,res) => {
 
try {
   const id = req.params.id
   const img = await shop.find({_id:id},{photos:1})
  

   if(img.length){
    return res.json(img[0].photos)
   }

} catch (error) {
  console.log(error)
}

}


const getShopImages = async (req, res) => {
  try {
     const token = getToken(req)
    const data = getData(token)
    const details = await shop.find({_id:data.id});
    
    if(!details.length){
      return res.json({error:'Something went wrong please re login'})
    }
    return res.json(details)

  } catch (error) {
    console.log(error)
  }
};

const deleteShopImg =async (req,res)=> {
  const imgName= req.params.id;
   const token = getToken(req);
   const data = getData(token);
   const id = data.id;
try {
  const updatedShop = await Shop.findByIdAndUpdate(
    id,
    { $pull: { photos: imgName } },
    { new: true }
  );

  if (!updatedShop) {
    
    return res.json({error:'Shop document not found'})
  } else {
    const details = await shop.find({_id:id})
    return res.json(details)
    
  }
} catch (error) {
  console.error("Error:", error);
  
}
}

const ifShop  = async (req,res) => {
  try {
    const result = await ifUserHave(req);

    if (!result) {
      return res.json({ error: "User logged out please re login" });
    } else {
      const details = getData(result);
   
      

      let userData;
    
        userData = await shop.find({ _id: details.id });
   

      if (!userData[0].access) {
        return res.json({ error: "Sorry you cannot enter this website...." });
      }else{
        return res.json(userData[0].businessName)
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const addLocation =async (req,res) => {
  const { markerLat, markerLng, shopId } = req.body;
  
  const setData = { latitude: markerLat, longitude: markerLng };
 try {
   const result = await shop.findOneAndUpdate(
     { _id: shopId },
     { $set: { location: setData } }
   );

   if (result) {
     
     return res.json({success:'data added'})
   } else {
     return res.json({error:'No matching document found'})
   }
 } catch (error) {
   console.error("Error while saving data:", error);
 }
}

const shopLogout = async (req, res) => {
  let token = await getToken(req);
  res.setHeader(
    "Set-Cookie",
    `abhi=${token}; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );
  res.json({ success: "Logout successful" });
};

export {
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
};
