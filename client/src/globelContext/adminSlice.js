import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name : 'admin',
    initialState: {
        user :null,
    },
    reducers : {
        loginAdmin : (state,action) => {
            state.user = action.payload;

        },
        logoutAdmin: (state) => {
            state.user = null;
        },
    }
})



export const {loginAdmin,logoutAdmin} = adminSlice.actions;
export default adminSlice.reducer;
