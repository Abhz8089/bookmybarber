
import { useEffect ,useState} from 'react';
import {useSelector} from 'react-redux'
import axios from "axios";
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';


import client from "../../../public/contentImages/Group 21.png";
import beautician from "../../../public/contentImages/Group 22.png";
import iphone from '../../../public/contentImages/phonegif.gif'

import style from '../ClientStyles/Home.module.css'
import Navbar from '../../components/CommonNav';
import Loader from '../../components/HelpingComponents/Loader'

import { useUserData } from "../../contexts/userContexts";




const Home = () => {
    // const user = useSelector((state) => state.user.user);
    // console.log(user)
  //  const { userData } = useUserData();
  //  console.log(userData)
   const [scrolling, setScrolling] = useState(false);
     const [loading, setLoading] = useState(true); 
    const Navigate = useNavigate()

   useEffect(() => {
      
   async function ifUser(){
    try {
      const {data} = await axios.get('/')

      if(data.message){
        localStorage.removeItem("shopData");
         localStorage.removeItem("userData");
        // Navigate('/login')
      }



    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
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
          setLoading(false); // Set loading to false after a delay (you can replace this with your actual loading logic)
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
          <div className={style.body}></div>
          <div className={style.fade}></div>
          <div className={style.subBody}>
            <div className={style.container}>
              <h1 className={style.explore}>Explore</h1>
            </div>
            <div className={style.image}>
              <img
                className={`${style.image1} ${
                  scrolling ? style["fade-in"] : ""
                }`}
                src={client}
                alt=""
              />
              <img
                className={`${style.image2} ${
                  scrolling ? style["fade-in"] : ""
                }`}
                src={beautician}
                alt=""
              />
            </div>

            <div className={style.subContainer}>
              <div className={style.maskedImage}></div>
              <h1 className={style.h1}>FOR CLIENT</h1>

              <div className={style.textDiv}>
                <p className={style.p}>
                  Some text
                  odzfdsdzfszrddzrzrzssdsdsdsdsstesttztztzrtzzzteztezteettstsssssssssssssssssssssssssn
                  the left sidefgyufjuyfjyjjgggygyg
                </p>
                <div className={style.iphoneImage}>
                  <img className={style.iphone} src={iphone} alt="iPhone" />
                  {/* <img
                className={style.gifInsideIphone}
                src="your-gif.gif"
                alt="GIF inside iPhone"
              /> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home