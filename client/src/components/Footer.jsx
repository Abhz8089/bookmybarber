import React from 'react'
import "./footer.css"
import facebookIcon from "../../public/contentImages/_Facebook.png";
import instagramIcon from "../../public/contentImages/_Instagram.png";
import linkedInIcon from "../../public/contentImages/_Linkedin.png";
import twitterIcon from "../../public/contentImages/_Twitter.png";
import copyrightIcon from "../../public/contentImages/Copyright.png";


const Footer = () => {
  return (
    <div className="parent">
      <div className="child">
        <div className="child1">
          <h2 className="bookmybarber-sub">
            book <span className="m">M</span>y barber
          </h2>
          <p className="sub-para">
            Welcome to bookMyBarber website where brilliance meets innovation!
            We are a leading company dedicated to delivering exceptional
            products and services to cater to your needs.
          </p>
        </div>
        <div className="child2">
          <h3 className="h3footer">Customer care</h3>
          <p className="sub-para1">
            Help center <br />
            Term & Conditions <br />
            Privacy policy <br />
            Return & refund <br />
            Survey & feedback
          </p>
        </div>
        <div className="child2">
          <h3 className="h3footer">Pages</h3>
          <p className="sub-para1">
            About Us <br />
            Styles <br />
            Contact Us <br />
            Services <br />
            Blog
          </p>
        </div>
        <div className="child2">
          <h3 className="h3footer">Subscribe Now</h3>
          <div className="footer-form">
            <input
              className="footer-input"
              type="text"
              placeholder="your email"
            />
            <button style={{ background: "yellow", borderRadius: "5px" }}>
              submit
            </button>
          </div>
          <div className="icons">
            <div className="subIcons">
              <img className="socialmedias" src={facebookIcon} alt="" />
              <img className="socialmedias" src={twitterIcon} alt="" />
              <img className="socialmedias" src={linkedInIcon} alt="" />
              <img className="socialmedias" src={instagramIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
      <hr className="dividerFooter" />
      <div className="copyright">
        <div className="subcopyright">
          <img src={copyrightIcon} alt="" />
          <p className="sub-para">2023 Estrella Inc. All rights reserved </p>
        </div>
      </div>
    </div>
  );
}

export default Footer