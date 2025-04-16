import crypto from "crypto";
import User from "../models/User.js";

export async function register(req, res) {
  const { email,password, isAdmin } = req.body;
 
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
 
  if (!email || !
