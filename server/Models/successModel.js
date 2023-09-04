import mongoose from "mongoose";
const timeSlotSchema = mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  }
);


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
    time: {
      type: String,
    },

    service: {
      type: [String],
    },
    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("booking", bookingSchema);
export default Booking;
