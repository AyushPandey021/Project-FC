import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { createJob, myJobs } from "../controllers/job.controller.js";

const router = express.Router();
router.post("/", auth, createJob);
router.get("/my", auth, myJobs);

export default router;
