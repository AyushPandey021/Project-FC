import User from "../models/User.model";
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log("📥 SIGNUP BODY:", req.body);

    // VALIDATION (MUST)
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
        name: user.name,          // ✅ ADD
        email: user.email,        // ✅ ADD
        role: user.role,
        profileCompleted: user.profileCompleted,
      },
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ msg: "Signup failed" });
  }
};
