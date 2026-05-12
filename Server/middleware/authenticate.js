import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(authHeader.slice(7), JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
