import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-hot-toast";



import Navbar from '../../components/users/Navbar';
import Footer from '../../components/footer';
 import styles from "../ClientStyles/Register.module.css"
 import { useUserData } from "../../contexts/userContexts";

const Register = () => {
  const [userData, setUserData] = useState({
    userName: '',
    email : '',
    password : '',
    cPassword:''
  })
 

  const Navigate = useNavigate()
   const {setUserData : setUserDataContext} =useUserData()

  const registerUser = async(e) => {
    e.preventDefault();
    
    const {userName,email,password,cPassword}=userData;

    try{
      const {data} = await axios.post('/register', {
        userName,email,password,cPassword
      })
      if(data.error){
        toast.error(data.error)
      }else{  
        setUserDataContext({userName,email,password,cPassword})
        setUserData({})   
        Navigate('/clientOTP') 
        
        
      }      
    }catch(error){
      toast.error(`error register `)
      console.log(error)
    }
    
  }
  return (
    <>
      <Navbar />
      <div className={styles.login}>
        <div className={styles.Login_Container}>
          <div className={styles.Login_sub}>
            <h1 className={styles.Login_text}>Client Sign Up</h1>
            <hr className={styles.divider} />
            <br />
            <form onSubmit={registerUser}>
              <div className={styles.form_group}>
                <label>Username</label>
                <input
                  className={styles.input}
                  type="text"
                  onChange={(e) => {
                    setUserData({ ...userData, userName: e.target.value });
                  }}
                  value={userData.userName}
                />
                <label>Email</label>
                <input
                  className={styles.input}
                  type="email"
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                  value={userData.email}
                />
                <label>Password</label>
                <input
                  className={styles.input}
                  type="password"
                  onChange={(e) => {
                    setUserData({ ...userData, password: e.target.value });
                  }}
                  value={userData.password}
                />
                <label>confirm Password</label>
                <input
                  className={styles.input}
                  type="password"
                  onChange={(e) => {
                    setUserData({ ...userData, cPassword: e.target.value });
                  }}
                  value={userData.cPassword}
                />

                <hr className={styles.divider} />
                <br />
                <button type="submit" className={styles.LoginButton}>
                  Submit
                </button>
                <br />

                <h6 style={{ color: "black" }}>Already have an account.</h6>
                <button
                  onClick={() => Navigate("/login")}
                  className={styles.signUpbtn}
                >
                  Login Here
                </button>
              </div>
            </form>
            <button className={styles.btn1} onClick={()=>Navigate('/s/sRegister')}>Beautician Sign Up</button>
            <button className={styles.btn2} onClick={()=>Navigate('/register')} >Client Sign Up</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register