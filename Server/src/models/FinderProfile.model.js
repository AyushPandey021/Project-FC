import mongoose from "mongoose";

const finderProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  phone: String,
  location: String,
  placeType: String,
});

export default mongoose.model("FinderProfile", finderProfileSchema);
