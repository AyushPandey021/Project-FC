import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/auth.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import jobRoutes from "./src/routes/job.routes.js";
import notificationRoutes from "./src/routes/notification.routes.js";

dotenv.config();
connectDB();

const app = express();


app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/jobs", jobRoutes);
app.use("/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
