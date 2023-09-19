import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";


import style from "./Styles/Style.module.css";
import Navbar from "../../components/CommonNav";
import Footer from "../../components/Footer";
import Loader from "../../components/HelpingComponents/Loader";



const Styles = () => {
  const dispatch = useDispatch();

  const [scrolling, setScrolling] = useState(false);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  // States for organizing data by category
  const [forMenStyles, setForMenStyles] = useState([]);
  const [forWomenStyles, setForWomenStyles] = useState([]);
  const [forKidStyles, setForKidStyles] = useState([]);
  const [forGirlsStyles, setForGirlsStyles] = useState([]);
  console.log(forMenStyles);
  console.log(forWomenStyles);
  console.log(forKidStyles);
  console.log(forGirlsStyles);


  useEffect(() => {
    async function ifUser() {
      try {
        const { data } = await axios.get("/s/style");
      

        // Organize data by category
        const menStyles = data.filter((item) => item.category === "FORMEN");
        const womenStyles = data.filter((item) => item.category === "FORWOMEN");
        const kidStyles = data.filter((item) => item.category === "FORBOYS");
        const girlsStyles = data.filter((item) => item.category === "FORGIRLS");

        // Update state with organized data
        setForMenStyles(menStyles);
        setForWomenStyles(womenStyles);
        setForKidStyles(kidStyles);
        setForGirlsStyles(girlsStyles);

      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }

    ifUser();

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2000);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(delay);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar scrolling={scrolling} />
          <div className={style.body}>
            <i className={style.head}>
              Hair <i style={{ color: "red" }}>S</i>tyles
            </i>
          </div>
          <div className={style.fade}></div>
          <div className={style.main}>
            <div className={style.headingdiv}>
              <h1 className={style.heading}>MEN</h1>
            </div>
            <div className={style.first}>
              <Carousel
                showArrows={true}
                showStatus={true}
                showIndicators={true}
                showThumbs={false}
                swipeable={true}
                autoPlay={true}
                autoFocus={true}
                className={style.carousal}
              >
                {forMenStyles.length ? (
                  forMenStyles.map((styleItem) => (
                    <div key={styleItem._id}>
                      <img
                        className={style.img}
                        src={`http://www.dabj.online/uploads/${styleItem.photos}`}
                        alt={styleItem.styleName}
                      />
                      <p className={style.p}>{styleItem.styleName}</p>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </Carousel>
            </div>
          </div>

          <div className={style.main}>
            <div className={style.headingdiv}>
              <h1 className={style.heading}>WOMANS</h1>
            </div>
            <div className={style.first}>
              <Carousel
                showArrows={true}
                showStatus={true}
                showIndicators={true}
                showThumbs={false}
                swipeable={true}
                autoPlay={true}
                autoFocus={true}
                className={style.carousal}
              >
                {forWomenStyles.length ? (
                  forWomenStyles.map((styleItem) => (
                    <div key={styleItem._id}>
                      <img
                        className={style.img}
                        src={`http://www.dabj.online/uploads/${styleItem.photos}`}
                        alt={styleItem.styleName}
                      />
                      <p className={style.p}>{styleItem.styleName}</p>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </Carousel>
            </div>
          </div>

          <div className={style.main}>
            <div className={style.headingdiv}>
              <h1 className={style.heading}>BOYS</h1>
            </div>
            <div className={style.first}>
              <Carousel
                showArrows={true}
                showStatus={true}
                showIndicators={true}
                showThumbs={false}
                swipeable={true}
                autoPlay={true}
                autoFocus={true}
                className={style.carousal}
              >
                {forKidStyles.length ? (
                  forKidStyles.map((styleItem) => (
                    <div key={styleItem._id}>
                      <img
                        className={style.img}
                        src={`http://www.dabj.online/uploads/${styleItem.photos}`}
                        alt={styleItem.styleName}
                      />
                      <p className={style.p}>{styleItem.styleName}</p>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </Carousel>
            </div>
          </div>

          <div className={style.main}>
            <div className={style.headingdiv}>
              <h1 className={style.heading}>GIRLS</h1>
            </div>
            <div className={style.first}>
              <Carousel
                showArrows={true}
                showStatus={true}
                showIndicators={true}
                showThumbs={false}
                swipeable={true}
                autoPlay={true}
                autoFocus={true}
                className={style.carousal}
              >
                {forGirlsStyles.length ? (
                  forGirlsStyles.map((styleItem) => (
                    <div key={styleItem._id}>
                      <img
                        className={style.img}
                        src={`http://www.dabj.online/uploads/${styleItem.photos}`}
                        alt={styleItem.styleName}
                      />
                      <p className={style.p}>{styleItem.styleName}</p>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </Carousel>
            </div>
          </div>

          <div className={style.footer}></div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Styles;
