import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Playlist from "../models/Playlist.js";
import { JWT_SECRET } from "../config.js";

const router = Router();

router.post("/signup", async (req, res) => {
  const { email, confirmEmail, password, name, dob, gender } = req.body;

  if (email !== confirmEmail) {
    return res.status(400).json({ message: "Emails do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name, dob, gender });
    const savedUser = await newUser.save();

    await new Playlist({
      userId: savedUser._id,
      playlists: [
        { name: "Top 50", songs: [] },
        { name: "Favorites", songs: [] },
      ],
    }).save();

    const token = jwt.sign({ userId: savedUser._id.toString() }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({
      user: { _id: savedUser._id, name: savedUser.name, email: savedUser.email },
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email or username already in use" });
    }
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error signing up user" });
  }
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({
      user: { _id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

export default router;
