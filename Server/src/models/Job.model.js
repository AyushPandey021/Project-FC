import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    cleanerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: { type: String, required: true },
    age: { type: Number },
    phone: { type: String, required: true },

    workType: {
      type: String,
      enum: ["Home", "PG", "Hotel", "Office"],
      required: true,
    },
        location: {              
      type: String,
      required: true,
    },

    workTime: { type: String, required: true },
    experience: { type: String },

    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Online"],
      required: true,
    },

    amount: { type: Number, required: true },

    description: { type: String },

    availability: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
