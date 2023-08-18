import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Shop/Navbar';
import Footer from '../../components/Footer';
import styles from '../ShopStyles/Otp.module.css'
import { useUserData } from "../../contexts/userContexts";
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ShopOtp = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const Navigate = useNavigate();
  const {userData,setUserData} =useUserData();

  const otpSubmit = async(e) => {
    e.preventDefault()
    userData.userOtp=otp;
    const {userName,email,password,cPassword,phoneNumber,address,businessName,zipCode,userOtp} = userData;
    try {
      const { data } = await axios.post("/s/shopOtp", {
        userName,
        email,
        password,
        cPassword,
        phoneNumber,
        address,
        businessName,
        zipCode,
        userOtp
      });
      if(data.error){
        toast.error(data.error)
      }else{
        setOtp('')
        setUserData({})
        Navigate('/s/sLogin')
       toast("Please wait while we verify your details.!", {
         icon: "❗",
         style: {
           borderRadius: "10px",
           background: "#333",
           color: "#fff",
         },
       });
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong ')
      
    }
      
  };

  useEffect(() => {
    if(!userData.email){
      Navigate('/s/register')
    }
    
     if (timer > 0 && resendDisabled) {
       const countdown = setInterval(() => {
         setTimer((prevTimer) => prevTimer - 1);
       }, 1000);
       return () => {
         clearInterval(countdown);
       };
     } else if (timer === 0 && resendDisabled) {
       setResendDisabled(false);
     }

  },[timer,resendDisabled])

  const resendOtp = async() => {
      try {
        setResendDisabled(true);
        setTimer(60);
        axios
          .post("/s/shopResendOtp", { email: userData.email })
          .then((data) => {
            if (data.error) {
              toast.error(data.error);
            }
          })
          .catch((err) => {
            toast.error("something went wrong");
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <>
      <Navbar />
      <div className={styles.login}>
        <div className={styles.Login_Container}>
          <div className={styles.Login_sub}>
            <h1 className={styles.Login_text}>OTP</h1>
            <hr className={styles.divider} />
            <br />
            <form action="" onSubmit={otpSubmit}>
              <div className={styles.form_group}>
                <label>Enter OTP</label>
                <input className= {styles.inputs}
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />

                <hr className={styles.divider} />
                <br />
                <button type="submit" className={styles.LoginButton}>
                  Confirm
                </button>
                <br />
                <hr className={styles.divider2} />
              </div>
            </form>
            <button
              className={styles.resend}
              disabled={resendDisabled}
              onClick={resendOtp}
            >
              {resendDisabled ? `Resend in ${timer} seconds` : "Resend"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShopOtp