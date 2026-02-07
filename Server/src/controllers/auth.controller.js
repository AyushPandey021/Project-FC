import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

/* ===================== SIGNUP ===================== */
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

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

    // validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    res.json({
      token: generateToken(user),
      user: {
        id: user._id,
        role: user.role,
        profileCompleted: user.profileCompleted,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Login failed" });
  }
};
