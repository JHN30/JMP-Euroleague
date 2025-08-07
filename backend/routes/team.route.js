import express from "express";
import {
  createTeam,
  getTeams,
  updateTeam,
  updateTeamRating,
  deleteTeam,
  getTeamById,
} from "../controllers/team.controller.js";

const router = express.Router();

router.post("/", createTeam);
router.get("/", getTeams);
router.get("/:id", getTeamById);
router.put("/:id", updateTeamRating);
router.put("/update/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
