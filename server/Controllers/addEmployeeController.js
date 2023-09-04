import jwt from "jsonwebtoken";
import moment from "moment-timezone";

import { createToken, getToken } from "../utils/generateToken.js";
import { getData } from "../utils/getDetails.js";

import Book from "../Models/SlotModel.js";
import Shop from "../Models/shopModel.js";
import slot from "../Models/SlotModel.js";

const addEmployee = async (req, res) => {
  try {
    const utcDateString = req.body.details.selectDate;
    const istDateString = moment
      .utc(utcDateString)
      .tz("Asia/Kolkata")
      .format("LLLL");
    req.body.details.selectDate = istDateString;
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
    const utcDateString = req.body.selectedDate;
    const istDateString = moment
      .utc(utcDateString)
      .tz("Asia/Kolkata")
      .format("LLLL");
    req.body.selectedDate = istDateString;

    const stringDate = req.body.selectedDate.toString();

    if (req.body.Employee == "allBarber") {
      var details = await Book.find(
        {
          date: stringDate,
          service: { $in: req.body.services },
          access: true,
        },
        { Time: 1, employeeName: 1, _id: 1 }
      );

      if (details.length) {
        details.forEach((detail) => {
          detail.Time = detail.Time.filter((timeObj) => timeObj.isAvailable);
        });
        const availableTimeObjects = details.filter(
          (item) => item.Time.length > 0
        );

        details = availableTimeObjects;

        return res.json({ details });
      } else {
        return res.json({ error: "Slot not available" });
      }
    } else {
      let details = await Book.find(
        {
          employeeName: req.body.Employee,
          date: req.body.selectedDate,
          service: { $in: req.body.services },
          access: true,
        },
        { Time: 1, employeeName: 1, _id: 1 }
      );
      if (details.length) {
        details.forEach((detail) => {
          detail.Time = detail.Time.filter((timeObj) => timeObj.isAvailable);
        });
        let availableTimeObjects = details.filter(
          (item) => item.Time.length > 0
        );
        details = availableTimeObjects;
        return res.json({ details });
      } else {
        return res.json({ error: "Slot not available" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

 const editDate = async (req, res) => {
   console.log(req.body)
   
  try {
     const { selectDate, empId } = req.body.details;
     
     
     
    await Book.findById(empId)
      .then((doc) => {
        if (!doc) {
          console.error("Document not found");
          return res.Json({error:"Document not found"})
        }
            const istDateString = moment
              .utc(selectDate)
              .tz("Asia/Kolkata")
              .format("LLLL");
        // Update the date field
        doc.date = istDateString;

        // Update the Time field
        doc.Time.forEach((timeSlot) => {
          timeSlot.isAvailable = true;
        });

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
   slot.findOneAndDelete({ _id: id })
     .then(async(deletedEmployee) => {
       if (deletedEmployee) {
    let details  =  await slot.find()
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

export {
  addEmployee,
  getBookings,
  editAccess,
  getEmployee,
  getSlot,
  editDate,
  deletEmpl,
};
