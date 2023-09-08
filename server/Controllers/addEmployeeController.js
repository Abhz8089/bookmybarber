import jwt from "jsonwebtoken";
import moment from "moment-timezone";

import { createToken, getToken } from "../utils/generateToken.js";
import { getData } from "../utils/getDetails.js";
import {convertDateFormat} from '../Helpers/DateFormat.js'

import Book from "../Models/SlotModel.js";
import Shop from "../Models/shopModel.js";
import Success from '../Models/successModel.js';



const addEmployee = async (req, res) => {
  console.log(req.body)
  try {
    const utcDateString = req.body.details.selectDate;
    const istDateString = moment
      .utc(utcDateString)
      .tz("Asia/Kolkata")
      .format("LLLL");
      const formatDate= new Date(istDateString)
      const betterDate= formatDate.toISOString()
    req.body.details.selectDate = betterDate;
    let addedDetails = req.body.details;
   
    if (!addedDetails.employeeName) {
      return res.json({ error: "Employee name is required" });
    }
    if (!addedDetails.time.length) {
      return res.json({ error: "Time is required" });
    }
    if (!addedDetails.services.length) {
      return res.json({ error: "Services is required" });
    }
    if (addedDetails.selectDate == "Invalid date") {
      return res.json({ error: "Date is required" });
    }

    let token = await getToken(req);

    if (!token) {
      return res.json({
        error: "you did not have permission to access this page",
      });
    }
    let details = getData(token);

    const Slot = new Book({
      shopID: details.id,
      employeeName: addedDetails.employeeName,
      Time: addedDetails.time,
      service: addedDetails.services,
      date: addedDetails.selectDate,
    });

    await Slot.save();

    res.json(Book);
  } catch (error) {
    console.log(error);
  }
};

const getBookings = async (req, res) => {
  try {
    const token = getToken(req);
    const data = getData(token);

    const shopDetails = await Book.find({ shopID: data.id });

    return res.json(shopDetails);
  } catch (error) {
    console.log("error in 56 in add employee c.js", error);
  }
};

const editAccess = async (req, res) => {
  try {
    const { id } = req.body;
    const document = await Book.findById(id);
    document.access = !document.access;
    const updatedDocument = await document.save();
    const token = await getToken(req)
    const data = await getData(token)
    
    if (updatedDocument) {
      let employee = await Book.find({shopID:data.id});
      return res.json(employee);
    }
  } catch (error) {
    console.log(error);
  }
};
const getEmployee = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await Book.find({ shopID: id });
    const shopData = await Shop.find({ _id: id }, { businessName: 1 });

    if (data) {
      const currentDate = new Date(); // Get the current date

      const filteredData = data.filter((item) => {
        const itemDate = new Date(item.date); // Convert the item's date to a Date object
        return itemDate >= currentDate; // Compare the dates
      });

      if (!filteredData.length) {
        return res.json({ error: "Slot is not available select another shop" });
      }

      return res.json({ employee: filteredData, shop: shopData });
    } else {
      return res.json({ error: "Slot is not available" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getSlot = async (req, res) => {

  try {
    


    const utcDateString = req.body.selectedDate + "T00:00:00.000Z";
  


    const inputDate=new Date()
    const outputDateString = convertDateFormat(inputDate);
    
    if (req.body.Employee == "allBarber") {
      const bookedDetails = await Success.find(
        {
          shopID: req.body.shopId,
          date: { $not: { $lte: outputDateString } },
        },
        { employeeName: 1, time: 1, date: 1 }
      );
 
   

      const details = {
        date: {$gte:utcDateString},
        leave:{$ne:utcDateString},
        shopID: req.body.shopId,
        service: {
          $in: req.body.services,
        },
        access: true,
      };
      let docs = await Book.find(details, {
        Time: 1,
        employeeName: 1,
        _id: 1,
        date: 1,
      }).exec();
     
    
   
      // Iterate through bookedDetails
      bookedDetails.forEach((booked) => {
        // Find the matching documentDetails
        const matchingDocument = docs.find((document) => {
          return (
            document.employeeName === booked.employeeName 
          
          );
        });

        // If a matching document is found, filter out the matching time
        if (matchingDocument) {
          matchingDocument.Time = matchingDocument.Time.filter((time) => {
            return time !== booked.time;
          });
        }
      });


      if (docs.length) {
         docs = docs.filter((doc) => doc.Time.length > 0);
         if (docs.length) {
           return res.json(docs);
         } else {
           return res.json({
             error: "Slot Not available please chose another date",
           });
         }
      } else {
        return res.json({ error: "Slot not available" });
      }
    } else {

     
       const bookedDetails = await Success.find(
         {
           employeeName:req.body.Employee,
           shopID: req.body.shopId,
           date: { $not: { $lte: outputDateString } },
         },
         { employeeName: 1, time: 1, date: 1 }
       );

      
      const details = {
        date: { $gte: utcDateString },
        employeeName:req.body.Employee,
        shopID: req.body.shopId,
        service: {
          $in: req.body.services,
        },
        access: true,
      };
      let docs = await Book.find(details, {
        Time: 1,
        employeeName: 1,
        _id: 1,
        date: 1,
      }).exec();

       //filtering for get available slots-----------------------------------
           bookedDetails.forEach((booked) => {
             // Find the matching documentDetails
             const matchingDocument = docs.find((document) => {
               return (
                 document.employeeName === booked.employeeName &&
                 document.date === booked.date
               );
             });

             // If a matching document is found, filter out the matching time
             if (matchingDocument) {
               matchingDocument.Time = matchingDocument.Time.filter((time) => {
                 return time !== booked.time;
               });
             }
           });
  //---------------------------------------------------------------------------------------------
        if (docs.length) {
          docs = docs.filter((doc) => doc.Time.length > 0);
          if (docs.length) {
            return res.json(docs);
          } else {
            return res.json({
              error: "Slot Not available please chose another date",
            });
          }
        } else {
          return res.json({
            error: "Slot Not available please chose another date",
          });
        }
         
    }
  
  } catch (error) {
    console.log(error);
  }
};

 const editDate = async (req, res) => {
  
   
  try {
     let { selectDate, empId } = req.body.details;
     
      selectDate = convertDateFormat(selectDate)
     
    await Book.findById(empId)
      .then((doc) => {
        if (!doc) {
          console.error("Document not found");
          return res.Json({error:"Document not found"})
        }
           
        // Update the date field
        doc.date = selectDate;

        // Save the updated document
        return doc.save();
      })
      .then(async(updatedDoc) => {
        console.log("Document updated successfully:", updatedDoc);
        const data = await Book.find()
        return res.json(data)
      })
      .catch((err) => {
        console.error("Error updating document:", err);
        res.json({error:'Error updating document'})
      });



     
  } catch (error) {
    console.log(error)
  }
    
 };

 const deletEmpl = async (req,res) => {
   try {
    const id = req.params.id ;
   Book.findOneAndDelete({ _id: id })
     .then(async(deletedEmployee) => {
       if (deletedEmployee) {
    let details  =  await Book.find()
       return res.json(details)

       } else {
         console.log(`Employee with ID ${employeeIdToDelete} was not found.`);
         return res.json({
           error: `Employee with ID ${employeeIdToDelete} was not found.`,
         });
       }
     })
     .catch((error) => {
       console.error(error); // Handle any errors
       return res.json({error:'Something went wrong'})
     });
   } catch (error) {
    console.log(error)
    
   }
 }

 const takeLeave =async (req,res) => {
   try {
   
    const {selectDate,empId}=req.body.details;
    const formatDate=  convertDateFormat(selectDate)

    const isBooking= await Success.find({empId:empId,date:formatDate})
    if(isBooking.length){
      const empName= isBooking[0].employeeName;
      console.log(empName)
      console.log(selectDate)

      let remainder = `Unfortunately,${empName} is fully booked on the ${selectDate}. Leave requests cannot be accommodated at this Day.`;
      // return res.json({
      //   remainder: `Unfortunately,${empName} is fully booked on the ${selectDate}. Leave requests cannot be accommodated at this Day.`,
      // });
      return res.json({error:remainder})
    }
    
   const result = await Book.findOneAndUpdate(
     { _id: empId },
     { $set: { leave: formatDate } },
     { new: true } 
   );
   if(result){
    const details= await Book.find()
    return res.json(details)
   }else{
    return res.json({error:'Something went wrong when updating leave try again later'})
   }

   } catch (error) {
    console.log(error)
   }
 }

export {
  addEmployee,
  getBookings,
  editAccess,
  getEmployee,
  getSlot,
  editDate,
  deletEmpl,
  takeLeave
};
