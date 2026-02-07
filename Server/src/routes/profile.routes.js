import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { completeProfile } from "../controllers/profile.controller.js";

const router = express.Router();
router.post("/complete", auth, completeProfile);

export default router;
