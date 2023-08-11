import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";


import App from './App.jsx'
import { UseDataProvider } from "./contexts/userContexts";

import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UseDataProvider>
    <Router>
      <App />
    </Router>
    </UseDataProvider>
  </React.StrictMode>
);
