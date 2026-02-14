import mongoose from "mongoose";

const cleanerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // 📍 Human readable address
    location: {
      type: String,
      required: true,
      trim: true,
    },

    // 🌍 Coordinates (for distance calculation)
    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    jobTypes: {
      type: [String],
      enum: ["Home", "PG", "Hotel", "Office"],
      default: [],
    },

    pricePerDay: {
      type: Number,
      required: true,
      min: 0,
    },

    // 🟢 Availability status
    status: {
      type: String,
      enum: ["on", "off"],
      default: "off",
    },

    // 🛡 Admin verification
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CleanerProfile", cleanerProfileSchema);
