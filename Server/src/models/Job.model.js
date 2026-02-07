import mongoose from "mongoose";

export default mongoose.model(
  "Job",
  new mongoose.Schema({
    finderId: mongoose.Schema.Types.ObjectId,
    cleanerId: mongoose.Schema.Types.ObjectId,
    jobType: String,
    location: String,
    payment: Number,
    status: { type: String, default: "available" }
  })
);
