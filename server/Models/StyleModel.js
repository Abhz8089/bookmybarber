import mongoose from "mongoose";


const StyleScheema = mongoose.Schema(
  {
    category: {
      type: String,
      
    },
    styleName:{
        type:String,
        
    },
    photos:{
        type:String
    },
    shopId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop"
    }
  },
  {
    timestamps: true,
  }
);

const Style = mongoose.model("Styles", StyleScheema);
export default Style;
