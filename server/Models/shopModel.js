import mongoose from "mongoose";

const shopSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cPassword: {
      type: String,
      required: true,
    },
    businessName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true
    },
    zipcode:{
        type:Number,
        required:true
    },
    access:{
      type:Boolean,
      default:false

    },
    photos:{
      type:[String]
    }
   

    
  },
  {
    timestamps: true,
  }
);

const shop = mongoose.model("Shop", shopSchema);
export default shop;
