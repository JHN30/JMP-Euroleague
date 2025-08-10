import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized - No access token provided" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      if (!decoded || !decoded.userId) {
        return res.status(401).json({ message: "Invalid token payload" });
      }

      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized - Access token expired" });
      }
      console.error("JWT Verification Error:", error);
      return res.status(403).json({ message: "Invalid token" });
    }
  } catch (error) {
    console.log("Error in verifyToken:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
