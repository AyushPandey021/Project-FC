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

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    /* ================= CLEANER PROFILE ================= */
    if (user.role === "cleaner") {
      const {
        phone,
        location,
        latitude,
        longitude,
        jobTypes,
        pricePerDay,
        name,
      } = req.body;

      if (!phone || !location || !latitude || !longitude || !pricePerDay) {
        return res.status(400).json({
          msg: "All required fields must be filled",
        });
      }

      const profile = await CleanerProfile.findOneAndUpdate(
        { userId },
        {
          phone,
          location,
          latitude,
          longitude,
          jobTypes,
          pricePerDay: Number(pricePerDay),
        },
        {
          upsert: true,
          returnDocument: "after",
        }
      );

      await User.findByIdAndUpdate(userId, {
        profileCompleted: true,
        ...(name && { name }),
      });

      return res.json({ success: true, profile });
    }

    /* ================= FINDER PROFILE ================= */
    if (user.role === "finder") {
      const { phone, location, latitude, longitude, placeType } = req.body;

      if (!phone || !location || !placeType) {
        return res.status(400).json({
          msg: "All required fields must be filled",
        });
      }

      const profile = await FinderProfile.findOneAndUpdate(
        { userId },
        {
          phone,
          location,
          latitude,
          longitude,
          placeType,
        },
        {
          upsert: true,
          returnDocument: "after",
        }
      );

      await User.findByIdAndUpdate(userId, {
        profileCompleted: true,
      });

      return res.json({ success: true, profile });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Profile update failed" });
  }
};



// status ceheck 
export const toggleAvailability = async (req, res) => {
  try {
    const profile = await CleanerProfile.findOne({
      userId: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    const newStatus =
      profile.status === "on" ? "off" : "on";

    await CleanerProfile.updateOne(
      { userId: req.user.id },
      { status: newStatus }
    );

    res.json({ status: newStatus });

  } catch (error) {
    console.error("TOGGLE STATUS ERROR:", error);
    res.status(500).json({ msg: "Failed to update status" });
  }
};






// 
export const getAvailableCleaners = async (req, res) => {
  try {
    const cleaners = await CleanerProfile.find({
      status: "on"
    }).populate("userId", "name");

    res.json(cleaners);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch cleaners" });
  }
};

