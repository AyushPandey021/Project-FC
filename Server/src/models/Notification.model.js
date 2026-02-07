import mongoose from "mongoose";

export default mongoose.model(
  "Notification",
  new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    message: String,
    read: { type: Boolean, default: false }
  })
);
