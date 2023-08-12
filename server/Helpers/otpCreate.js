
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

   
    function otp (){
        const otps =    otpGenerator.generate(6, {
              digits: true,
              alphabets: false,
              upperCaseAlphabets: true,
              specialChars: false,
              lowerCaseAlphabets: true,
            });

            return otps;

    }

     const transporter = nodemailer.createTransport({
       host: "smtp.ethereal.email",
       port: 587,
       auth: {
         user: "rico0@ethereal.email",
         pass: "m5HN5aUf6RWrH4rG4g",
       },
     });


     export {otp,transporter}