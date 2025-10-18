import express from "express";
import {
  createTeam,
  createAllTeams,
  getTeams,
  updateTeam,
  updateTeamRating,
  updateTeamRating2,
  deleteTeam,
  deleteAllTeams,
  getTeamById,
} from "../controllers/team.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createTeam);
router.post("/bulk", verifyToken, createAllTeams);
router.get("/", getTeams);
router.delete("/", verifyToken, deleteAllTeams);
router.get("/:id", getTeamById);
router.put("/:id", verifyToken, updateTeamRating);
router.put("/rating2/:id", verifyToken, updateTeamRating2);
router.put("/update/:id", verifyToken, updateTeam);
router.delete("/:id", verifyToken, deleteTeam);

export default router;
