import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["finder", "cleaner", "admin"] },
  profileCompleted: { type: Boolean, default: false }
});

export default mongoose.model("User", UserSchema);
