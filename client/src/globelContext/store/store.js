// import { configureStore } from "@reduxjs/toolkit";
// import useReducer from "../userSlice";

// const store = configureStore({
//     reducer : {
//         user : useReducer
//     }
// })

// export default store;


import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Choose storage engine
import userReducer from "../userSlice";

const persistConfig = {
  key: "root", // Key for storage
  storage, // Storage engine (localStorage, sessionStorage, etc.)
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
});

export const persistor = persistStore(store);

export default store;
