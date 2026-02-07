import mongoose from "mongoose";

export default mongoose.model(
  "CleanerProfile",
  new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    phone: String,
    location: String,
    jobTypes: [String],
    pricePerDay: Number,
    status: { type: String, default: "off" },
    verified: { type: Boolean, default: false }
  })
);
