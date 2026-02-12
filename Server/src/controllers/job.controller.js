import Job from "../models/Job.model.js";
import CleanerProfile from "../models/CleanerProfile.model.js";

export const createJob = async (req, res) => {
  try {
    const {
      name,
      age,
      phone,
      workType,
      workTime,
      experience,
      paymentMode,
      amount,
      description,
    } = req.body;

    /* ================= REQUIRED FIELD VALIDATION ================= */
    if (!name || !age || !phone || !workType || !workTime || !paymentMode || !amount) {
      return res.status(400).json({
        msg: "All required fields must be filled",
      });
    }

    /* ================= CLEANER PROFILE FETCH ================= */
    const cleanerProfile = await CleanerProfile.findOne({
      userId: req.user.id,
    });

    // 🔎 DEBUG LOGS (IMPORTANT)
    console.log("User ID from token:", req.user.id);
    console.log("Cleaner Profile:", cleanerProfile);
    console.log("Availability Value:", cleanerProfile?.availability);
    console.log("Type of Availability:", typeof cleanerProfile?.availability);

    if (!cleanerProfile) {
      return res.status(400).json({
        msg: "Complete your profile first",
      });
    }

    /* ================= AVAILABILITY CHECK ================= */
 if (cleanerProfile.availability  ) {
  return res.status(400).json({
    msg: "You are currently not available",
  });
}


    /* ================= CREATE JOB ================= */
    const job = await Job.create({
      cleanerId: req.user.id,
      name,
      age: Number(age),
      phone,
      workType,
      workTime,
      experience: experience ? Number(experience) : 0,
      paymentMode,
      amount: Number(amount),
      description,
      availability: "pending",
    });

    res.status(201).json({
      msg: "Job created successfully",
      job,
    });

  } catch (err) {
    console.error("JOB CREATE ERROR:", err);
    res.status(500).json({
      msg: "Failed to create job",
    });
  }
};
