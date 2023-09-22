import path from 'path';
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
import cors from 'cors';
import connectDB from "./config/config.js";
import cookieParser from "cookie-parser";
const app = express();

//routes
import clientRoutes from './Routes/clientRoute.js';
import shopRoutes from './Routes/shopRoute.js';
import adminRoutes from './Routes/adminRoute.js'

//data base connection
connectDB()

//dirname configuration
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 
//middlewares
app.use("/uploads",express.static(__dirname+"/uploads"))
app.use(express.json())
// app.use(cors({ origin: process.env.FRONT_END_URL, credentials: true }));
const corsOptions = {
  origin: [
    "https://dabj.online",
    "https://www.dabj.online",
    "http://localhost:8000",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));



const buildPath = path.join(__dirname, "../client/dist");
app.use(express.static(buildPath));


app.use('/',clientRoutes)
app.use("/s",shopRoutes)
app.use("/ad",adminRoutes)

app.get("/*", function (req, res) {
  const indexPath = path.join(buildPath, "index.html");

  console.log("Index HTML Path:", indexPath);

  res.sendFile(indexPath, function (err) {
    if (err) {
      console.error("Error sending index.html:", err);
      res.status(500).send(err);
    } else {
      console.log("Index.html sentuccessfully");
    }
  });
});



app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})


