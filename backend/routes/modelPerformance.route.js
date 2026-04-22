import express from "express";

import { getCurrentModelPerformance, importModelPerformance } from "../controllers/modelPerformance.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/current", getCurrentModelPerformance);
router.post("/import", verifyToken, importModelPerformance);

export default router;
