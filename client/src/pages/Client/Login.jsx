import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import styles from "../ClientStyles/Login.module.css";


import Navbar from "../../components/users/Navbar";
import Footer from "../../components/Footer";
import { loginUser as loginClient } from "../../globelContext/shopSlice";
import { useUserData } from "../../contexts/userContexts";

const GoogleAuthComponent = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const onSuccess = async (credentialResponse) => {
    try {
      console.log(credentialResponse);
      const decoded = jwt_decode(credentialResponse.credential);
      console.log(decoded);
      const gName = decoded.name;
      const gEmail = decoded.email;
      const { data } = await axios.post("/googleLogin", { gName, gEmail });
      if (data.error) {
        toast.error(data.error);
      } else {
        // dispatch(loginClient(data))
          localStorage.setItem("userData", JSON.stringify(data));
        Navigate("/");
        toast.success("Login successful");
        
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const onError = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId="815839922134-9i576f0a2fcpt2bje8vpjo1gs1o8gk6s.apps.googleusercontent.com">
      <GoogleLogin onSuccess={onSuccess} onError={onError} />
    </GoogleOAuthProvider>
  );
};

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const Navigate = useNavigate();
  const { setUserData: setUserDataContext } = useUserData();

 
  const dispatch = useDispatch();

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", { email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
       // dispatch(loginClient(data));
         localStorage.setItem("userData", JSON.stringify(data));

        Navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const forgotPassword = async () => {
    let email = data.email;
    try {
      const { data } = await axios.post("/chPassword", { email: email });

      if (data.error) {
        toast.error(data.error);
      } else {
        setUserDataContext({ email: data.email });
        Navigate("/chPOtp");
      }
    } catch (error) {
      console.log(error, "error in 60 Login page");
    }
  };

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    //  const userDataString = useSelector(state => state.user.user);

    

    if (userDataString) {
      Navigate("/");
    }
  }, []);

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
                <label className={styles.label}>Email</label>
                <input
                  className={styles.input}
                  type="email"
                  value={data.email}
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                />
                <label className={styles.label}>Password</label>
                <input
                  className={styles.input}
                  type="password"
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                />
                <p onClick={forgotPassword} className={styles.forgot_p}>
                  Forgot Password
                </p>
                <hr className={styles.divider} />
                <br />
                <button type="submit" className={styles.LoginButton}>
                  Login
                </button>
                <br />
                {/* <div className={styles.google}>
                  <GoogleOAuthProvider clientId="815839922134-9i576f0a2fcpt2bje8vpjo1gs1o8gk6s.apps.googleusercontent.com">
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        console.log(credentialResponse)
                        const decoded = jwt_decode(
                          credentialResponse.credential
                        );
                        console.log(decoded)
                      }}
                      onError={() => {
                        console.log("Login Failed")
                      }}
                    />
                    ;
                  </GoogleOAuthProvider>
                </div> */}
                <div className={styles.google}>
                  <GoogleAuthComponent />
                </div>

                <h6 className={styles.didnt} style={{ color: "black" }}>don’t have any account ? </h6>
                <button
                  onClick={() => Navigate("/register")}
                  className={styles.signUpbtn}
                >
                  Signup Now
                </button>
              </div>
            </form>

            <button
              className={styles.btn1}
              onClick={() => Navigate("/s/sLogin")}
            >
              Beautician Login
            </button>
            <button className={styles.btn2} onClick={() => Navigate("/login")}>
              Client Login
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
