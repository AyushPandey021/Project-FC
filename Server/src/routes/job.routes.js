import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  createJob,
  getMyJobs,
  updateJob   // 👈 must import
} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/create", auth, createJob);
router.get("/my", auth, getMyJobs);
router.put("/update/:id", auth, updateJob);  
export default router;
