import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  getMyProfile,
  completeProfile,
  toggleAvailability,
  // getAvailableCleaners,
  getAvailableJobs,
} from "../controllers/profile.controller.js";

const router = express.Router();
router.get("/available-jobs", auth, getAvailableJobs);
router.get("/me", auth, getMyProfile);
router.post("/complete", auth, completeProfile);
router.patch("/availability", auth, toggleAvailability);
// router.get("/available-cleaners", auth, getAvailableCleaners);



export default router;
