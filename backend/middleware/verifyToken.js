import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error in verifyToken:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
