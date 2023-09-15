import mongoose from "mongoose";



const ChatSchema = mongoose.Schema(
  {
    roomID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
    },

    shopID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shop",
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    message: {
      type: String,
    },
    sender: {
      type: String,
    },
    notification: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const chatSchema = mongoose.model("Chats", ChatSchema);
export default chatSchema;
