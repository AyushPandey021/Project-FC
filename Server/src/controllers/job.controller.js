import Job from "../models/Job.model.js";
import CleanerProfile from "../models/CleanerProfile.model.js";

export const createJob = async (req, res) => {
  try {
    const {
      name,
      age,
      phone,
      workType,
      location,
      latitude,
      longitude,
      workTime,
      experience,
      paymentMode,
      amount,
      description,
    } = req.body;

    /* ================= REQUIRED FIELD VALIDATION ================= */
if (
  !name || !age || !phone || !location ||
  !latitude || !longitude ||
  !workType || !workTime || !paymentMode || !amount
) {
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
  if (cleanerProfile.status !== "on") {
  return res.status(400).json({
    msg: "You are currently offline",
  });
}



    /* ================= CREATE JOB ================= */
   if (!cleanerProfile) {
  return res.status(400).json({
    msg: "Complete your profile first",
  });
}

if (cleanerProfile.status !== "on") {
  return res.status(400).json({
    msg: "You are currently offline",
  });
}

const job = await Job.create({
  cleanerId: req.user.id,
  name,
  age: Number(age),
  phone,
  workType,
  location,
  latitude,
  longitude,
  workTime,
  experience: experience || "",
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
/* ================= MY JOB ================= */
export const getMyJobs = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const jobs = await Job.find({
      cleanerId: req.user._id   // 👈 FIXED
    }).sort({ createdAt: -1 });

    res.json(jobs);

  } catch (error) {
    console.error("GET MY JOBS ERROR:", error);
    res.status(500).json({ msg: "Failed to fetch jobs" });
  }
};


// update 
export const updateJob = async (req, res) => {
  try {
    console.log("UPDATE ROUTE HIT");

    // const job = await Job.findOneAndUpdate(
    //   {
    //     _id: req.params.id,
    //     cleanerId: req.user.id
    //   },
    //   {
    //     ...req.body
    //   },
    //   { new: true }
    //   // { returnDocument: "after" }

    // );

    const job = await Job.findOneAndUpdate(
  {
    _id: req.params.id,
    cleanerId: req.user.id
  },
  req.body,
  { returnDocument: "after" }
);

    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    res.json(job);

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ msg: "Failed to update job" });
  }
};

// delete 
export const deleteJob = async (req, res) => {
  try {
    console.log("DELETE ROUTE HIT");

    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      cleanerId: req.user.id   // only owner can delete
    });

    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    res.json({ msg: "Job deleted successfully" });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ msg: "Failed to delete job" });
  }
};
