import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Navbar from "../../components/users/Navbar";
import Footer from "../../components/Footer";

import Style from "../ClientStyles/ShopList.module.css";
import {
  employeeList,
  logoutClient,
  shop as saveShop,
  clearShopList,
} from "../../globelContext/clientSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ShopLists = () => {
  const [shop, setShop] = useState([]);
  const [img, setImg] = useState([]);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const shoplist = useSelector((state) => state.client.shopList);

  // Define items per page
  const itemsPerPage = 3;

  // Track the current page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const ifUser = async () => {
      try {
        const { data } = await axios.get("/ifUser");
        if (data.error) {
          dispatch(logoutClient());
          toast.error(data.error);
        }
      } catch (error) {
        dispatch(logoutClient());
        toast.error("Server please re login");
      }
    };
    ifUser();

    if (shoplist) {
      setShop(shoplist);
      setImg(img);
    }
  }, [shoplist]);

  // Calculate the total number of pages based on the shoplist length and items per page
  const totalPages = Math.ceil(shoplist.length / itemsPerPage);

  // Calculate the start and end indices of the items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the shoplist to get the items for the current page
  const shopsToDisplay = shoplist.slice(startIndex, endIndex);

  const goShop = async (id) => {
    try {
      const { data } = await axios.post("/s/getEmployee", { id });

      if (data.error) {
        toast.error(data.error);
      } else {
        dispatch(employeeList(data.employee));
        dispatch(saveShop(data.shop));
        Navigate("/filter");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Navbar />
      <div className={Style.container}>
        {shopsToDisplay.map((list, key) => (
          <Card key={key} className={Style.card}>
            <Card.Img
              className={Style.image}
              variant="top"
              src={
                list.photos && list.photos.length
                  ? `http://www.dabj.online/uploads/${list.photos[0]}`
                  : "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFyYmVyc2hvcHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              }
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
              <Button
                className={Style.button}
                onClick={() => goShop(list._id)}
                variant="primary"
              >
                CHECK
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className={Style.pagination}>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            color="primary"
            variant="outline"
          />
        </Stack>
      </div>

      <Footer />
    </>
  );
};

export default ShopLists;
