import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  getMyProfile,
  completeProfile,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/me", auth, getMyProfile);
router.post("/complete", auth, completeProfile);

export default router;
