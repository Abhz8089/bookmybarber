import express from "express";
import dotenv from "dotenv";
const port = process.env.PORT_NUMBER;
dotenv.config();
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
app.use(cors({ origin: process.env.FRONT_END_URL,credentials:true }));
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.use('/',clientRoutes)
app.use("/s",shopRoutes)
app.use("/ad",adminRoutes)



app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})


