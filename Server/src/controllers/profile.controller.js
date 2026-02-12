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
  try {
    const userId = req.user.id;

    const {
      phone,
      location,
      jobTypes,
      pricePerDay,
      name,
    } = req.body;

    // 🔒 Only allow specific fields
    const profile = await CleanerProfile.findOneAndUpdate(
      { userId },
      {
        phone,
        location,
        jobTypes,
        pricePerDay: Number(pricePerDay),
      },
      { new: true, upsert: true }
    );

    // 🔒 Only allow name update (NOT email, NOT role)
const updateData = {
  profileCompleted: true,
};

if (name && name.trim() !== "") {
  updateData.name = name;
}

await User.findByIdAndUpdate(userId, updateData);


    res.json({ success: true, profile });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Profile update failed" });
  }
};


export const toggleAvailability = async (req, res) => {
  const { availability } = req.body;

  const profile = await CleanerProfile.findOneAndUpdate(
    { userId: req.user.id },
    { availability },
    { new: true, upsert: true }
  );

  res.json({ availability: profile.availability });
};
