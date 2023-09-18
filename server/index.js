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


//middlewares
app.use(express.json())
app.use(cors({ origin: process.env.FRONT_END_URL, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

//dirname configuration
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
      console.log("Index.html sent successfully");
    }
  });
});



app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})


