import React from 'react'

import Navbar from '../../components/users/Navbar'
import Footer from '../../components/Footer'

import Style from '../ClientStyles/FirstPage.module.css' 

const FirstPage_shopSearch = () => {
  return (
    <>
      <Navbar />
      <div className={Style.container}>
        <div className={Style.formBody}>
          <form action="" className={Style.form}>
            <div className={Style.label}>zipcode</div>
            <div className={Style.inputButtonContainer}>
              <input
                className={Style.input}
                placeholder="Search  nearest shop using  zipcode...."
                type="text"
              />

              <button className={Style.button}>SEARCH</button>
            </div>
          </form>
          <div className={Style.divider}>or</div>
          <form action="" className={Style.form}>
            <div className={Style.label}>Shop Name</div>
            <div className={Style.inputButtonContainer}>
              <input
                className={Style.input}
                placeholder="Search  popular shop using name..."
                type="text"
              />

              <button className={Style.button}>SEARCH</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FirstPage_shopSearch

