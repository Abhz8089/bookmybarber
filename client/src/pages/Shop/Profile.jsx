import React, { useRef } from "react";
import Navbar from "../../components/Shop/Navbar";
import Footer from "../../components/Footer";
import SubNav from "../../components/Shop/SubNav";
import Styles from "../ShopStyles/Profile.module.css";
import { IoMdCamera } from "react-icons/io";
import userIcon from "../../../public/contentImages/User_circle.png";
import userIconGif from "../../../public/contentImages/icons8-shop.gif";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Profile = () => {
  const fileInputRef = useRef(null);
  

  const handleFileSelect = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const file of fileInputRef.current.files) {
      console.log(file);
      formData.append("images", file);
    }

    axios.post("/s/sUpload", formData).then(({data}) => {
       console.log(data)
       console.log('-----------------------------------profilepage data---------------------')
       
      if(data.error){
        
        toast.error(data.error)

      }else{

        fileInputRef.current.value = "";
        toast.success('Image uploaded')
      }
      
    }).catch((error)=> toast.error('Please upload proper Image'));
  };
  return (
    <>
      <Navbar />
      <SubNav />
      <div className={Styles.profileBody}>
        <div className={Styles.profile_subBody}>
          <div className={Styles.profile_innerDiv}>
            <img
              src={userIconGif}
              onError={(e) => {
                e.target.src = userIcon;
                e.target.alt = "Backup User Profile";
              }}
              className={Styles.profile_img}
            />{" "}
            <h3>Hair style</h3>
          </div>
          <div className={Styles.profile_againInnerDiv}>
            <h4 className={Styles.h4}>
              BUSINESS ADDRESS &nbsp;&nbsp;:&nbsp;&nbsp; Hair Hair styles
            </h4>
            <h4>ZIP CODE &nbsp;&nbsp;:&nbsp;&nbsp;123456</h4>
          </div>
          <form onSubmit={handleFileSelect}>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              ref={fileInputRef}
            />
            <button type="submit" className={Styles.upload} >Upload</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
