import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

/* ===================== SIGNUP ===================== */
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log("📥 SIGNUP BODY:", req.body);

    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (!["finder", "cleaner", "admin"].includes(role)) {
      return res.status(400).json({ msg: "Invalid role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      profileCompleted: false,
    });

    res.json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileCompleted: user.profileCompleted,
      },
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ msg: "Signup failed" });
  }
};

/* ===================== LOGIN ===================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📥 LOGIN BODY:", req.body);

    if (!email || !password) {
      return res.status(400).json({ msg: "Email & password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    res.json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileCompleted: user.profileCompleted,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Login failed" });
  }
};
