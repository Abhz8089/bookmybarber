// import { configureStore } from "@reduxjs/toolkit";
// import useReducer from "../userSlice";

// const store = configureStore({
//     reducer : {
//         user : useReducer
//     }
// })

// export default store;


// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; 
// import adminReducer from "../userSlice";

// const persistConfig = {
//   key: "root", 
//   storage, 
// };

// const persistedadminReducer = persistReducer(persistConfig, adminReducer);

// const store = configureStore({
//   reducer: {
//     user: persistedadminReducer,
//   },
// });

// export const persistor = persistStore(store);

// export default store;


import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminReducer from "../adminSlice";
import userReducer from "../shopSlice"; // Import your shopSlice reducer

const adminPersistConfig = {
  key: "admin",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage,
};

const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedAdminReducer,
    shop: persistedUserReducer,
  },
});

export const persistor = persistStore(store);

export default store;
