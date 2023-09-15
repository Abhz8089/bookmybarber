import React, { useRef, useState } from "react";
import Navbar from "../../components/Shop/Navbar";
import Footer from "../../components/Footer";
import SubNav from "../../components/Shop/SubNav";
import Styles from "../ShopStyles/Profile.module.css";

import userIcon from "../../../public/contentImages/User_circle.png";
import userIconGif from "../../../public/contentImages/icons8-shop.gif";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import addImg from '../../../public/contentImages/a.png'
import { FaEye } from "react-icons/fa";

import AddImageModal from "../../components/ModalComponent/AddImageModal";

import Chat from '../../components/Shop_Chat/supportEngine/supportEngine'

const Profile = () => {
  const fileInputRef = useRef(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const Navigate = useNavigate()

     const openModal = () => {
       setIsModalOpen(true);
     };

      const closeModal = () => {
          setIsModalOpen(false);
      };

  const handleFileSelect = (e) => {

    e.preventDefault();


    const formData = new FormData();
    for (const file of fileInputRef.current.files) {
      console.log(file);
      formData.append("images", file);
    }

    axios.post("/s/sUpload", formData).then(({data}) => {
      
       
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
            <label htmlFor="images">Upload your images..</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              placeholder="upload your image"
              multiple
              ref={fileInputRef}
            />

            <button type="submit" className={Styles.upload}>
              Upload
            </button>
            <div className={Styles.container}>
              <FaEye
                className={Styles.faeye}
                onClick={() => Navigate("/s/sGetShopImg")}
              />
              <i className={Styles.viewImage}>View added Images</i>
            </div>
          </form>

          <div className={Styles.imageContainer}>
            <div className={Styles.overlayText}>Add Hair Styles</div>
            <img
              className={Styles.addImg}
              src={addImg}
              onClick={openModal}
              alt=""
            />
          </div>
          <div className={Styles.container}>
            <FaEye
              className={Styles.faeye}
              onClick={() => Navigate("/s/sStyleImg")}
            />
            <i className={Styles.viewImage}>View Image</i>
          </div>
        </div>
      </div>
      <Chat/>
      <Footer />
      <AddImageModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </>
  );
};

export default Profile;
