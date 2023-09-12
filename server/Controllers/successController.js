import Book from '../Models/SlotModel.js'
import success from '../Models/successModel.js'
import shop from '../Models/shopModel.js';
import client from '../Models/clientModel.js';
import { getTokenForUser as getToken } from "../utils/generateToken.js";
import {getData} from '../utils/getDetails.js';
import {convertDateFormat} from  '../Helpers/DateFormat.js';



const successBook =async(req,res)=>{
    try {
      const { time, id, Employee, date, services } = req.body;

     const barberShopId = await Book.find(
       { _id: id },
       { shopID: 1}
     );
     let FormattedDate = convertDateFormat(date)
      

     const shopName = await shop.find({ _id: barberShopId[0].shopID });
   

      
 
      const originalEmployee = await Book.find({_id:id},{employeeName:1},)
      
    
       
  
          const token = getToken(req);

          const userData = getData(token);
         
          const successful = await success.create({
            shopID: barberShopId[0].shopID,
            shopName: shopName[0].businessName,
            shopAddress: shopName[0].address,
            userId: userData.userId,
            userName: userData.userName,
            employeeName: originalEmployee[0].employeeName,
            empId:originalEmployee[0]._id,
            time: time,
            service: services,
            date: FormattedDate,
          });
        
          if(successful){
            return res.json(successful)
          }else{
         return res.json({error:'Server error please wait few second or retry'})
          }
    
     

        
    } catch (error) {
        console.log(error)
    }
    
}

const bookedDetails = async (req,res) => {
    
    try {
        const token = getToken(req)
        if(token){
            const data = getData(token)
          
            const details = await success.find({ userId: data.userId });
               const reversedDetails = details.reverse();
            return res.json(reversedDetails)
        }else{
            return res.json({error:'Please re-Login'})
        }
        
    } catch (error) {
        console.log(error)
    }
}

const Bookings = async (req,res) => {
 
      try {
        const token = getToken(req);
        if (token) {
          const data = getData(token);
       
          const details = await success.find({ shopID: data.id });
          
          return res.json(details);
        } else {
          return res.json({ error: "Please re-Login" });
        }
      } catch (error) {
        console.log(error);
      }
}

    const cancelBooking = async (req,res) => {
      try {
         
        const { id } = req.body;
            const updatedDocument = await success.findOneAndUpdate(
              { _id:id },
              { status: false }, 
              { new: true } 
            );

            if (!updatedDocument) {
              return res.json({error:"Document not found"})
            } else {
              const token = await getToken(req)
              const data = await getData(token)
             
              const booking = await success.find({userId:data.userId})
             
              res.json(booking)
            }

      } catch (error) {
        console.log(error)
      }
    }

export {successBook,bookedDetails,Bookings,cancelBooking}