import React, { useEffect, useState } from 'react'

import Navbar from '../../components/users/Navbar'
import Footer from '../../components/Footer'


import Style from '../ClientStyles/FirstPage.module.css' 
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import {  logoutClient, shopList} from "../../globelContext/clientSlice";
import { useNavigate } from 'react-router-dom'

const FirstPage_shopSearch = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const [datas, setData] = useState({
    pincode:'',
    name:''
  })
  // const [name, setName] = useState('')
  
  useEffect(() => {
   
    const ifUser = async ()=>{
      try {
        const {data} = await axios.get('/ifUser')
        if(data.error){
            dispatch(logoutClient());
            toast.error(data.error);
        }

      } catch (error) {
        dispatch(logoutClient())
        toast.error('Server please re login')
      }
    }
   ifUser()
   
  }, [])
  



  const search = async(e)=>{
    e.preventDefault()
    
    try {
      const {data} = await axios.post('/search',datas)
   
      if(data.error){
        toast.error(data.error)
      }else{
        dispatch(shopList(data))
        Navigate('/shopList');
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }


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
                value={datas.pincode}
                onChange={(e) => {
                  setData({...datas,pincode:e.target.value})
                }}
                placeholder="Search  nearest shop using  zipcode...."
                type="number"
              />

         
            </div>
          </form>
          <div className={Style.divider}>or</div>
          <form action="" className={Style.form}>
            <div className={Style.label}>Shop Name</div>
            <div className={Style.inputButtonContainer}>
              <input
                className={Style.input}
                value={datas.name}
                onChange={(e) => {
                  setData({...datas,name:e.target.value});
                }}
                placeholder="Search  popular shop using name..."
                type="text"
              />
                
              <button className={Style.button} onClick={search}>SEARCH</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FirstPage_shopSearch

