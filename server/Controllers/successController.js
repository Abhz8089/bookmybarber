import Book from "../Models/SlotModel.js";
import success from "../Models/successModel.js";
import shop from "../Models/shopModel.js";
import client from "../Models/clientModel.js";
import {
  getTokenForUser as getToken,
  getToken as getTokenForShop,
} from "../utils/generateToken.js";
import { getData } from "../utils/getDetails.js";
import { convertDateFormat } from "../Helpers/DateFormat.js";
import { resolveContent } from "nodemailer/lib/shared/index.js";

const successBook = async (req, res) => {
  try {
    const { time, id, Employee, date, services } = req.body;

    const barberShopId = await Book.find({ _id: id }, { shopID: 1 });
    let FormattedDate = convertDateFormat(date);

    const shopName = await shop.find({ _id: barberShopId[0].shopID });

    const originalEmployee = await Book.find({ _id: id }, { employeeName: 1 });

    const token = getToken(req);

    const userData = getData(token);

    const alreadyBooked = await success.find({
      shopID: barberShopId[0].shopID,
      userId: userData.userId,
      time: time,
      date: FormattedDate,
    });
    if(alreadyBooked.length){
      return res.json({
        error:
          "The selected time slot is already booked. Please choose another time.",
      });
    }

    const successful = await success.create({
      shopID: barberShopId[0].shopID,
      shopName: shopName[0].businessName,
      shopAddress: shopName[0].address,
      userId: userData.userId,
      userName: userData.userName,
      employeeName: originalEmployee[0].employeeName,
      empId: originalEmployee[0]._id,
      time: time,
      service: services,
      date: FormattedDate,
    });

    if (successful) {
      return res.json(successful);
    } else {
      return res.json({
        error: "Server error please wait few second or retry",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const bookedDetails = async (req, res) => {
  try {
    const token = getToken(req);
    if (token) {
      const data = getData(token);

      const details = await success.find({ userId: data.userId });
      const reversedDetails = details.reverse();
      return res.json(reversedDetails);
    } else {
      return res.json({ error: "Please re-Login" });
    }
  } catch (error) {
    console.log(error);
  }
};

const Bookings = async (req, res) => {
  try {
    const token = getTokenForShop(req);
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
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.body;
    const updatedDocument = await success.findOneAndUpdate(
      { _id: id },
      { status: false },
      { new: true }
    );

    if (!updatedDocument) {
      return res.json({ error: "Document not found" });
    } else {
      const token = await getToken(req);
      const data = await getData(token);

      const booking = await success.find({ userId: data.userId });

      res.json(booking);
    }
  } catch (error) {
    console.log(error);
  }
};

const getNotification =async (req,res) => {
  try {
    const { userId } = req.query;
    const currentDate = new Date();
   
    var originalDate = new Date(currentDate);

    
    originalDate.setUTCHours(0, 0, 0, 0);

    
    var desiredDateStr = originalDate.toISOString();

  
   
    const details = await success.find({userId:userId,date:desiredDateStr})
    const count = details.length;
    
      return res.json({details,count})
    
  } catch (error) {
    console.log(error)
  }
}

export { successBook, bookedDetails, Bookings, cancelBooking, getNotification };
