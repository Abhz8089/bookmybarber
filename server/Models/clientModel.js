import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
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
      required: false,
    },
    cPassword: {
      type: String,
      required: false,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const client = mongoose.model('Client',clientSchema)
export default client;

