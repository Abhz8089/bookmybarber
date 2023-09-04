import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUserData = createAsyncThunk(
  "client/fetchUserData",
  async () => {
    try {
      // Replace with your API endpoint
      const {data} = await axios.get("/getUser");
      return data; // Assuming the API response contains user data
    } catch (error) {
      console.log(error)
    }
  }
);




const clientSlice = createSlice({
  name: "client",
  initialState: {
    user: null,
    shop:null
  },
  reducers: {
    loginClient: (state, action) => {
      state.user = action.payload;
    },
    logoutClient: (state) => {
      state.user = null;
      state.shopList =null;
      state.employeeList=null;
      state.shopDetails= null;
    },
    loginShop:(state,action) => {
        state.shop =action.payload
    },
    logoutShop:(state) => {
      state.shop = null
    },
    shopList:(state,action) => {
      state.shopList = action.payload
    },
    employeeList:(state,action) => {
      state.employeeList = action.payload
    },
    shop:(state,action) => {
      state.shopDetails = action.payload
    }
  },
});

export const { loginClient, logoutClient,loginShop,logoutShop,shopList,employeeList,shop} = clientSlice.actions;
export default clientSlice.reducer;
