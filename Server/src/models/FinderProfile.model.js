import mongoose from "mongoose";

export default mongoose.model(
  "FinderProfile",
  new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    phone: String,
    location: String,
    placeType: String
  })
);
