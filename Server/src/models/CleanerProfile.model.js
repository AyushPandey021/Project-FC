import mongoose from "mongoose";

const cleanerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  phone: String,
  location: String,
  jobTypes: [String],
  pricePerDay: Number,
availability: {
  type: Boolean,
  default: false,
},
verified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("CleanerProfile", cleanerProfileSchema);
