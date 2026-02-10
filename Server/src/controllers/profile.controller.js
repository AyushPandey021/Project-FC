import CleanerProfile from "../models/CleanerProfile.model.js";
import FinderProfile from "../models/FinderProfile.model.js";
import User from "../models/User.model.js";

/* ================= GET MY PROFILE ================= */
export const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  let profile = null;
  if (user.role === "cleaner") {
    profile = await CleanerProfile.findOne({ userId: user._id });
  }
  if (user.role === "finder") {
    profile = await FinderProfile.findOne({ userId: user._id });
  }

  res.json({ user, profile });
};

/* ================= COMPLETE PROFILE ================= */
export const completeProfile = async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;

  let profile;

  if (role === "cleaner") {
    profile = await CleanerProfile.findOneAndUpdate(
      { userId },
      { ...req.body, userId },
      { new: true, upsert: true }
    );
  }

  if (role === "finder") {
    profile = await FinderProfile.findOneAndUpdate(
      { userId },
      { ...req.body, userId },
      { new: true, upsert: true }
    );
  }

  await User.findByIdAndUpdate(userId, {
    profileCompleted: true,
  });

  res.json({ success: true, profile });
};

/* ================= TOGGLE AVAILABILITY ================= */
export const toggleAvailability = async (req, res) => {
  const { availability } = req.body;

  const profile = await CleanerProfile.findOneAndUpdate(
    { userId: req.user.id },
    { availability },
    { new: true, upsert: true }
  );

  res.json({ availability: profile.availability });
};
