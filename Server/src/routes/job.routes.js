import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { createJob } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/create", auth, createJob);

export default router;
