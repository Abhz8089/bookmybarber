import mongoose from "mongoose";

// const timeSlotSchema = mongoose.Schema(
//   {
//     time: {
//       type: String,
//       required: true,
//     },
//     isAvailable: {
//       type: Boolean,
//       default: true, 
//     },
//   },
//   {
//     _id: false, 
//   }
// );


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
      type: [String],
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
    },
    leave:{
      type:String,
      default:"null"
    }
  },
  {
    timestamps: true,
  }
);

const slot = mongoose.model("Employee", slotSchema);
export default slot;


