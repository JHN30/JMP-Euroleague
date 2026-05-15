import express from "express";

import {
  getCurrentModelPerformance,
  getCurrentModelPerformanceRoundDetail,
  importModelPerformance,
  importModelPerformanceMatchups,
} from "../controllers/modelPerformance.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/current", getCurrentModelPerformance);
router.get("/current/rounds/:roundNumber", getCurrentModelPerformanceRoundDetail);
router.post("/import", verifyToken, importModelPerformance);
router.post("/import-matchups", verifyToken, importModelPerformanceMatchups);

export default router;
