import React, { useState } from "react";

import Navbar from "../../components/users/Navbar";
import Footer from "../../components/Footer";
import styles from "../ClientStyles/changePassword.module.css";
import { useUserData } from "../../contexts/userContexts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const ChangePassword = () => {
  const [password, setPassword] = useState({
    pass: "",
    cPass: "",
  });
  const { userData, setUserData } = useUserData();

  const Navigate = useNavigate();

  const changePassword = async (e) => {
    e.preventDefault();

    const { email } = userData;
    const passw = password.pass;
    const cPassw = password.cPass;
    try {
      const { data } = await axios.post("/s/sSubPassword", {
        email,
        passw,
        cPassw,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setUserData({})
        toast.success("Password successfully updated");
        Navigate("/s/sLogin");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.login}>
        <div className={styles.Login_Container}>
          <div className={styles.Login_sub}>
            <h1 className={styles.Login_text}>Change Password</h1>
            <hr className={styles.divider} />
            <br />
            <form action="" onSubmit={changePassword}>
              <div className={styles.form_group}>
                <label>Enter New Password</label>
                <input
                  className={styles.input}
                  type="text"
                  value={password.pass}
                  onChange={(e) => {
                    setPassword({ ...password, pass: e.target.value });
                  }}
                />
                <label>Confirm Password</label>
                <input
                  className={styles.input}
                  type="password"
                  value={password.cPass}
                  onChange={(e) => {
                    setPassword({ ...password, cPass: e.target.value });
                  }}
                />

                <hr className={styles.divider} />
                <br />
                <button type="submit" className={styles.LoginButton}>
                  Change
                </button>
                <br />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChangePassword;
