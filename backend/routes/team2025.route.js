import express from "express";
import {
  createTeam,
  getTeams,
  updateTeam,
  updateTeamRating,
  deleteTeam,
  getTeamById,
} from "../controllers/team2025.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createTeam);
router.get("/", getTeams);
router.get("/:id", getTeamById);
router.put("/:id", updateTeamRating);
router.put("/update/:id", verifyToken, updateTeam);
router.delete("/:id", verifyToken, deleteTeam);

export default router;
