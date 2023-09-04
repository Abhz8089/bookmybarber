import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
  initialState: {
    shop: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.shop = action.payload;
    },
    logoutUser: (state) => {
      state.shop = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer ;
