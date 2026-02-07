import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { getNotifications } from "../controllers/notification.controller.js";

const router = express.Router();
router.get("/", auth, getNotifications);

export default router;
