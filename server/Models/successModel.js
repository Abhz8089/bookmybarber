import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    shopID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    shopName:{
      type:String,

    },
    shopAddress:{
      type:String
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    userName:{
      type:String
    },
    employeeName: {
      type: String,
    },
    empId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    },
    time: {
      type: String,
    },

    service: {
      type: [String],
    },
    date: {
      type: String,
    },
    status:{
      type:Boolean,
      default:true,
    }
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("booking", bookingSchema);
export default Booking;
