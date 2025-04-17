import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "votre_cle_secrete_jwt";  

export async function register(req, res) {
  const { email, password, isAdmin } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(409).json({
        error: "User already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      isAdmin,
    });

    res.status(201).json({
      success: true,
      message: "User Registered",
      user: {
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: "Registration Failed",
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: "Login Failed",
    });
  }
}

export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
}
