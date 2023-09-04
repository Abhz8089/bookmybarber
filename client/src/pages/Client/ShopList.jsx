import React, { useEffect, useState } from "react";
import {Button,Card} from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";



import Navbar from "../../components/users/Navbar";
import Footer from "../../components/Footer";

import Style from "../ClientStyles/ShopList.module.css";
import {employeeList,shop as saveShop} from '../../globelContext/clientSlice'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ShopLists = () => {
  const [shop, setShop] = useState([])
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const shoplist = useSelector((state) => state.client.shopList);
  useEffect(() => {
    if (shoplist) {
      setShop(shoplist);
     
    }
    
  }, [shoplist]);

  const goShop=async(id)=>{
    try {
    const {data} = await axios.post('/s/getEmployee',{id})
    if(data.error){
      toast.error(data.error)
    }else{
      dispatch(employeeList(data.employee))
      dispatch(saveShop(data.shop))
      Navigate('/filter')
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
        {shop.map((list, key) => (
          <Card key={key} className={Style.card}>
            <Card.Img
              className={Style.image}
              variant="top"
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            />
            <Card.Body className={Style.cardBody}>
              <Card.Title>
                {" "}
                <b>{list.businessName}</b>
              </Card.Title>
              <Card.Text>
                {" "}
                <i>{list.address}</i>{" "}
              </Card.Text>
              <Button className={Style.button} onClick={()=>goShop(list._id)} variant="primary">
                CHECK
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ShopLists;
