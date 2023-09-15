import mongoose from "mongoose";

const RoomSchema = mongoose.Schema(
  {
    shopID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shop",
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Client'
    },
  },
  {
    timestamps: true,
  }
);

const roomSchema = mongoose.model("ChatRoom", RoomSchema);
export default roomSchema;
