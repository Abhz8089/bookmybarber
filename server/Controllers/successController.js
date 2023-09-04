import Book from '../Models/SlotModel.js'
import success from '../Models/successModel.js'
import shop from '../Models/shopModel.js';
import client from '../Models/clientModel.js';
import {getToken} from '../utils/generateToken.js';
import {getData} from '../utils/getDetails.js'


const successBook =async(req,res)=>{
    try {
      const { time, id, Employee, selectedDate, services } = req.body;

     const barberShopId = await Book.find(
       { _id: id },
       { shopID: 1}
     );

     const shopName = await shop.find({ _id: barberShopId[0].shopID });
   

      const result = await Book.updateOne(
        { _id: id, "Time.time": time },
        { $set: { "Time.$.isAvailable": false } }
      );
 
      const originalEmployee = await Book.find({_id:id},{employeeName:1})
      
    
      
      if(result.modifiedCount>0){
          const token = getToken(req);

          const userData = getData(token);
         
          const successful = await success.create({
            shopID: barberShopId[0].shopID,
            shopName:shopName[0].businessName,
            shopAddress:shopName[0].address,
            userId: userData.userId,
            userName:userData.userName,
            employeeName: originalEmployee[0].employeeName,
            time: time,
            service: services,
            date: selectedDate,
          });
        
          if(successful){
            return res.json(successful)
          }else{
         return res.json({error:'Server error please wait few second or retry'})
          }
      }else{
        return res.json({error:"Server error"})
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
            return res.json(details)
        }else{
            return res.json({error:'Please re-Login'})
        }
        
    } catch (error) {
        console.log(error)
    }
}

const Bookings = async (req,res) => {
  console.log('yah')
      try {
        const token = getToken(req);
        if (token) {
          const data = getData(token);
          console.log(data.id)
          const details = await success.find({ shopID: data.id });
          
          return res.json(details);
        } else {
          return res.json({ error: "Please re-Login" });
        }
      } catch (error) {
        console.log(error);
      }
}

export {successBook,bookedDetails,Bookings}