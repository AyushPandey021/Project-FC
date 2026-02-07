import User from "../models/User.model.js";
import FinderProfile from "../models/FinderProfile.model.js";

export const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  const profile = await FinderProfile.findOne({ userId: req.user.id });

  res.json({ user, profile });
};

export const completeProfile = async (req, res) => {
  const profile = await FinderProfile.findOneAndUpdate(
    { userId: req.user.id },
    { ...req.body, userId: req.user.id },
    { upsert: true, new: true }
  );

  await User.findByIdAndUpdate(req.user.id, {
    profileCompleted: true,
  });

  res.json({ profileCompleted: true });
};
