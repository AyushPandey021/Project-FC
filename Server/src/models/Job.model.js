import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    cleanerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      min: 18,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    workType: {
      type: String,
      enum: ["Home", "PG", "Hotel", "Office"],
      required: true,
    },

    // 📍 Human readable address
    location: {
      type: String,
      required: true,
      trim: true,
    },

    // 🌍 Coordinates for distance calculation
    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    workTime: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      default: "0",
    },

    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Online"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      trim: true,
    },

    availability: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
