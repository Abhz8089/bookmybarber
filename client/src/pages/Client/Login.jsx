import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import styles from"../ClientStyles/Login.module.css"

import Navbar from '../../components/users/Navbar'
import Footer from '../../components/footer'

const Login = () => {
  const [data, setData] = useState({
    email:'',
    password:''

  })
  const loginUser = async(e) => {
    e.preventDefault()
    const {email,password}=data;
    try {
      const {data} = await axios.post('/login',
      {email,password});
      if(data.error){
        console.log('err')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const Navigate = useNavigate()
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
                  type="email"
                  value={data.email}
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                />
                <label>Password</label>
                <input
                  type="password"
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                />
                <p className={styles.forgot_p}>Forgot Password</p>
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
            <button className={styles.btn1}>Beautician Login</button>
            <button className={styles.btn2}>Client Login</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login

