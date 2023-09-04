import React from 'react'
import Navbars from '../../components/users/Navbar';
import Footer from '../../components/Footer'

import Styles from '../ClientStyles/successPage.module.css'
import checkout from '../../../public/contentImages/checkout.png';
import signin from '../../../public/contentImages/signin.png'
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const Navigate = useNavigate()
  return (
   <>
   
   <Navbars/>
   <div className={Styles.successBody}>
   <img src={checkout} alt="" />
   <h1>successfully booked</h1>
   <img src={signin} onClick={()=>Navigate('/details')} alt="" /> 
   </div>
   <Footer/>
   </>
  )
}

export default SuccessPage;