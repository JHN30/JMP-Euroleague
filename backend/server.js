import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import connectMongoDB from "./lib/db/connectMongoDB.js";

import authRoutes from "./routes/auth.route.js";
import roundRoutes from "./routes/round.route.js";
import teamRoutes from "./routes/team.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
  : ["http://localhost:5173", "https://www.jmpeuroleague.com", "https://jmp-euroleague.onrender.com"];

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/rounds", roundRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "frontend", "dist");

  app.use(express.static(distPath));

  // Serve index.html for non-API GET requests so client-side routing works after refresh
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      return res.sendFile(path.join(distPath, "index.html"));
    }
    return next();
  });
}

app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
