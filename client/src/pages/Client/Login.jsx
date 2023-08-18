import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector,useDispatch } from "react-redux";


import styles from"../ClientStyles/Login.module.css"

import Navbar from '../../components/users/Navbar'
import Footer from '../../components/Footer'
import { loginUser as loginClient } from "../../globelContext/userSlice";
 import { useUserData } from "../../contexts/userContexts";


const Login = () => {
  const [data, setData] = useState({
    email:'',
    password:''
  })

  const Navigate = useNavigate();
  const { setUserData: setUserDataContext } = useUserData();

  // const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const loginUser = async(e) => {
    e.preventDefault()
    const {email,password}=data;
    try {
      const {data} = await axios.post('/login',
      {email,password});
      if(data.error){
        toast.error(data.error)
      }else{
        dispatch(loginClient(data));
        Navigate('/home')
      }

    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
    }
  }

  const forgotPassword =async()=>{
   
    let email = data.email
    try {
      const {data} = await axios.post('/chPassword',{email:email})

     
      if(data.error){
        toast.error(data.error)
      }else{
        setUserDataContext({email:data.email})
        Navigate('/chPOtp')
      }

    } catch (error) {
      console.log(error,"error in 60 Login page")
    }
  }
  
  return (
    <>
      <Navbar />
      <div className={styles.login}>
        <div className={styles.Login_Container}>
          <div className={styles.Login_sub}>
            <h1 className={styles.Login_text}>Client Login</h1>
            <hr className={styles.divider} />
            <br />
            <form action="" onSubmit={loginUser}>
              <div className={styles.form_group}>
                <label>Email</label>
                <input
                  className={styles.input}
                  type="email"
                  value={data.email}
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                />
                <label>Password</label>
                <input
                  className={styles.input}
                  type="password"
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                />
                <p onClick={forgotPassword} className={styles.forgot_p}>Forgot Password</p>
                <hr className={styles.divider} />
                <br />
                <button type="submit" className={styles.LoginButton}>
                  Login
                </button>
                <br />

                <h6 style={{ color: "black" }}>don’t have any account ? </h6>
                <button
                  onClick={() => Navigate("/register")}
                  className={styles.signUpbtn}
                >
                  Signup Now
                </button>
              </div>
            </form>
            <button className={styles.btn1} onClick={()=>Navigate('/s/sLogin')}>Beautician Login</button>
            <button className={styles.btn2} onClick={()=>Navigate('/login')}>Client Login</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login

