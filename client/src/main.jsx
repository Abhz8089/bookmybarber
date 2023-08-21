import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./globelContext/store/store";




import App from "./App.jsx";
import { UseDataProvider } from "./contexts/userContexts";
// import store from "./globelContext/store/store.js";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UseDataProvider>
          <Router>
            <App />
            {/* <AppWithLoader /> */}
          </Router>
        </UseDataProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
