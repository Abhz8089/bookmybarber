import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Shop/Navbar";
import Footer from "../../components/Footer";
import SubNav from "../../components/Shop/SubNav";
import Styles from "../ShopStyles/StyleImg.module.css";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { Carousel } from "react-responsive-carousel";

const ShowShopImg = () => {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    const getImg = async () => {
      try {
        const { data } = await axios.get("/s/sGetShopImg");
        if (data.error) {
          toast.error(data.error);
        } else {
          setRecords(data);
          console.log(data)
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };

    getImg();
  }, []);

  const deletePic = async (datas) => {
    Swal.fire({
      title: "Do you want to delete image?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "delete",
      denyButtonText: `cancel`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(`/s/sDeleteShopImg/${datas}`);
          if (data.error) {
            toast.error(data.error);
          } else {
            setRecords(data);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
        Swal.fire("deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      <Navbar />
      <SubNav />
      <div className={Styles.profileBody}>
        <div className={Styles.profile_subBody}>
          <div className={Styles.first}>
            <Carousel
              showArrows={true}
              showStatus={true}
              showIndicators={false}
              showThumbs={false}
              swipeable={true}
              autoPlay={true}
              autoFocus={true}
              className={Styles.carousal}
            >
              {records.length > 0 &&
                records[0].photos.map((data, index) => (
                  <div key={index}>
                    <div>
                      <img
                        className={Styles.styleImg}
                        src={`../../../uploads/${data}`}
                        alt=""
                      />
                    </div>
                    <FaTrash
                      className={Styles.deleteIcon}
                      onClick={() => deletePic(data)}
                    />
                  </div>
                ))}
            </Carousel>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShowShopImg;
