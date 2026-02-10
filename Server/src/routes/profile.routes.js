import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  getMyProfile,
  completeProfile,
  toggleAvailability,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/me", auth, getMyProfile);
router.post("/complete", auth, completeProfile);
router.patch("/availability", auth, toggleAvailability);

export default router;
