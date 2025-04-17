import jwt from "jsonwebtoken";
import { authMiddleware } from "./authmiddleware2";

const JWT_SECRET = process.env.JWT_SECRET || "votre_cle_secrete_jwt";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); 
    req.user = decoded; 
    next(); 
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}

export function requireAdmin(req, res, next) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: "Admin access only." });
  }
  next();
}
