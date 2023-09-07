

import style from "./Styles/About.module.css";
import Navbar from "../../components/CommonNav";
import Footer from "../../components/Footer";
import Loader from "../../components/HelpingComponents/Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
 

  const [scrolling, setScrolling] = useState(false);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  // States for organizing data by category


  useEffect(() => {


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
              About <i style={{ color: "red" }}>U</i>s
            </i>
          </div>
          <div className={style.subbody}>
            <div className={style.text}>
              <h2 className={style.h2} style={{ color: "white" }}>
                Book <i style={{ color: "red" }}>M</i>y barber is an Appointment
                Booking Software Solution for Independent barbers.
              </h2>
              <p>
                Organizing a busy business life can prove to be a herculean task
                especially when there’s only a little time available. Hectic
                Barbers life with numerous responsibilities require the Ring My
                Barber app for careful planning to make sure they run smoothly
                and without hassles. It is the first app designed to manage
                every aspect of an Independent Barber’s business.
              </p>
              <ul>
                <li>Your Client Base</li>
                <li>Appointments</li>
                <li>Services</li>
                <li>Confirmations</li>
                <li>Reminders</li>
              </ul>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default About;
