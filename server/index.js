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
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.use('/',clientRoutes)
app.use("/s",shopRoutes)
app.use("/ad",adminRoutes)

// if(process.env.NODE_ENV === 'production') {
//     const __dirname = path.resolve();
//     app.use(express.static(path.join(__dirname,'client/dist')));

//     app.get('*',(req,res) => res.sendFile(path.resolve(__dirname,'client','dist','index.html')))
// }else{
//     app.get('/',(req,res) => res.send('Server is ready'))
// }


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})


