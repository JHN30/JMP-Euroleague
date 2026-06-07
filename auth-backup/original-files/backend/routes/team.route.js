import express from "express";
import {
  createTeam,
  getTeams,
  updateTeam,
  deleteTeam,
  getTeamById,
} from "../controllers/team.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createTeam);
router.get("/", getTeams);
router.get("/:id", getTeamById);
router.put("/update/:id", verifyToken, updateTeam);
router.delete("/:id", verifyToken, deleteTeam);

export default router;
