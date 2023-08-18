import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';





import Footer from "../../components/Footer";
import Navbar from '../../components/Shop/Navbar';
import st from '../ShopStyles/Register.module.css';
import { toast } from 'react-hot-toast';
import { useUserData } from "../../contexts/userContexts";


const ShopRegister = () => {

  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    cPassword: "",
    phoneNumber:" ",
    address:" ",
    businessName:"",
    zipCode :""
  });

  const Navigate = useNavigate();
   const { setUserData: setUserDataContext } = useUserData();

  const registerUser = async(e) => {
    e.preventDefault()
     const {userName,email,password,cPassword,phoneNumber,address,businessName,zipCode} = userData;
     
    try {
      
   let {data} = await axios.post("/s/sRegister", {
     userName,
     email,
     password,
     cPassword,
     phoneNumber,
     address,
     businessName,
     zipCode,
   });
   
   if (data.error) {
     toast.error(data.error)
   }else{
       setUserDataContext({
         userName,
         email,
         password,
         cPassword,
         phoneNumber,
         address,
         businessName,
         zipCode,
       })
       setUserData({})
       Navigate('/s/sOtp')
     
   }
   
      
    } catch (error) {
      console.log(error)
    }
    
    

      
  }


  return (
    <>
      <Navbar />
      <div className={st.login}>
        <div className={st.Login_Container}>
          <div className={st.Login_sub}>
            <h1 className={st.Login_text}>Shop SignUp</h1>
            <hr className={st.divider} />
            <br />
            <form onSubmit={registerUser}>
              <div className={st.form_group}>
                <div className={st.first_row}>
                  <input
                    type="text"
                    placeholder="Enter your Name...."
                    onChange={(e) => {
                      setUserData({ ...userData, userName: e.target.value });
                    }}
                    value={userData.userName}
                  />

                  <input
                    type="email"
                    placeholder="Enter your email...."
                    onChange={(e) => {
                      setUserData({ ...userData, email: e.target.value });
                    }}
                    value={userData.email}
                  />
                </div>

                <div className={st.first_row}>
                  <input
                    type="password"
                    placeholder="Enter Password...."
                    onChange={(e) => {
                      setUserData({ ...userData, password: e.target.value });
                    }}
                    value={userData.password}
                  />

                  <input
                    type="number"
                    placeholder="Enter your Phone Number..."
                    onChange={(e) => {
                      setUserData({ ...userData, phoneNumber: e.target.value });
                    }}
                    value={userData.phoneNumber}
                  />
                </div>
                <div className={st.first_row}>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => {
                      setUserData({ ...userData, cPassword: e.target.value });
                    }}
                    value={userData.cPassword}
                  />

                  <input
                    type="text"
                    placeholder="Enter your Business Name...."
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        businessName: e.target.value,
                      });
                    }}
                    value={userData.businessName}
                  />
                </div>
                <div className={st.first_row}>
                  <input
                    type="number"
                    placeholder="Enter Shop Located Zip code..."
                    onChange={(e) => {
                      setUserData({ ...userData, zipCode: e.target.value });
                    }}
                    value={userData.zipCode}
                  />
                  <input
                    type="text"
                    placeholder="Enter Business Address..."
                    onChange={(e) => {
                      setUserData({ ...userData, address: e.target.value });
                    }}
                    value={userData.address}
                  />
                </div>

                <hr className={st.divider} />
                <br />
                <button type="submit" className={st.LoginButton}>
                  Submit
                </button>
                <br />

                <h6 style={{ color: "black" }}>Already have an account.</h6>
                <button
                  onClick={() => Navigate("/s/sLogin")}
                  className={st.signUpbtn}
                >
                  Login Here
                </button>
              </div>
            </form>
            <button className={st.btn1} onClick={()=>Navigate('/s/sRegister')} >Beautician Sign Up</button>
            <button className={st.btn2} onClick={()=>Navigate('/register')}>Client Sign Up</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShopRegister