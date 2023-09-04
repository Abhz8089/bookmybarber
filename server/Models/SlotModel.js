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


const slotSchema = mongoose.Schema(
  {
    shopID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shop",
    },
    employeeName: {
      type: String,
    },
    Time: {
      type: [timeSlotSchema],
      required: true,
    },
    service: {
      type:[String]
      
    },
    date: {
      type: String,
      
    },
    access:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

const slot = mongoose.model("Employee", slotSchema);
export default slot;


