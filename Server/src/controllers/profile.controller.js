import User from "../models/User.model.js";

export const completeProfile = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { profileCompleted: true });
  res.json({ msg: "Profile completed" });
};
