import React, { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";


import ClientNavbars from "../../components/users/Navbar";
import ShopNavbars  from "../../components/Shop/Navbar";



import Footer from "../../components/Footer";

import Styles from '../ClientStyles/Map.module.css'

import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
} from "react-map-gl";
import axios from "axios";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";

const Maps = () => {
  const [ln, setLn] = useState(76.2673); 
  const [lat, setLat] = useState(9.9312); 
  const [markerLng, setMarkerLng] = useState(0);
  const [markerLat, setMarkerLat] = useState(0);
  const [user, setUser] = useState('');
  const [shop, setShop] = useState('');
  const Navigate = useNavigate()



  const Shop = useSelector((state) => state.client.shop);
  const User = useSelector((state)=>state.client.user);
 
  const  loc = useSelector((state)=>state.client.shopList)
  
  useEffect(() => {
   
   if(Shop){
      Swal.fire({
        html: '<div style="font-size: 14px; color:#fff;text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;">Hello, as a user, you can set your shop location by moving the marker to the desired position on the map. Once you have positioned the marker at your preferred location, simply click the Create button.</div>',
        width: 500,
        padding: "2em",
        color: "#000000",
        background:
          "url(https://i.pinimg.com/originals/77/e5/7b/77e57ba008318ae5ad24e625e95f5906.gif)",
        backdrop: `
    rgba(0,0,123,0.4)
   
    center top
    
    no-repeat
  `,
      });
   }else if(User){

    Swal.fire({
      html: '<div style="font-size: 14px; color:#fff;text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;">Explore your favorite shops location and discover the distance between you and the shop.</div>',
      width: 500,
      padding: "2em",
      color: "#000000",
      background:
        "url(https://media.tenor.com/YPe_fvvh8DUAAAAM/smartparcel-location.gif)",
      backdrop: `
    rgba(0,0,123,0.4)
   
    center top
    
    no-repeat
  `,
    });

     if(loc){
      
      setMarkerLat(loc.latitude);
      setMarkerLng(loc.longitude);
     }
    

   }else{
    Navigate('/login')
   }
   

   
    

    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;
      setLn(longitude);
      setLat(latitude);
 
    });

    if(Shop){
      setShop(Shop)
    }
    if(User){
      setUser(User)
    }
  }, []); 

    

  
  const handleMarkerDrag = (event) => {
    setMarkerLng(event.lngLat.lng);
    setMarkerLat(event.lngLat.lat);
    
  };

   const handleGeolocate = (position) => {
   
  
     setLn(position.coords.longitude);
     setLat(position.coords.latitude);
   };


   const create =async()=> {

    Swal.fire({
      title: "Do you want to save the location?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "save",
      denyButtonText: `Don't save`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        
    try {
      const { data } = await axios.post("/s/sAddLocation", {
        markerLat,
        markerLng,
        shopId,
      });
      if(data.error){
        toast.error(data.error)
      }else{
        toast.success('Location saved')
      }
    } catch (error) {
      toast.error('something went wrong please re-Login')
    }
       
      } 
    });
  
    const shopId=shop.id;
   
   }


  return (
    <>
      {Shop ? <ShopNavbars /> : <ClientNavbars />}

      <div className={Styles.body}>
        <div className={Styles.map}>
          <Map
            mapboxAccessToken="pk.eyJ1IjoiYWJoaWppdGhkaHNoIiwiYSI6ImNsbWRja2YzYzFuM3ozZW14cjJ6cWd2cmQifQ.G5XbV-vpTEP_pikGCN2WSQ"
            style={{
              width: "85%",
              height: "500px",
              borderRadius: "15px",
              border: "2px solid red",
              zIndex: "999",
            }}
            initialViewState={{ longitude: ln, latitude: lat, zoom: 12 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            {shop ? (
              <Marker
                longitude={markerLng}
                latitude={markerLat}
                draggable={true}
                onDragEnd={handleMarkerDrag}
              />
            ) : (
              <Marker
                longitude={markerLng}
                latitude={markerLat}
                draggable={false}
                onDragEnd={handleMarkerDrag}
              />
            )}

            <NavigationControl position="bottom-right" />
            <FullscreenControl />
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              auto={true}
              onGeolocate={handleGeolocate}
            />
          </Map>
        </div>
        <div className={Styles.buttons}>
          {/* <button  className={Styles.button1} onClick={goPlace}>Go</button> */}
          {Shop ? (
            <button className={Styles.button2} onClick={create}>
              Create
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Maps;

