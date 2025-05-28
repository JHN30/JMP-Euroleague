import express from "express";
import { createTeam, getTeams, updateTeam, deleteTeam } from "../controllers/team.controller.js";

const router = express.Router();

router.post("/", createTeam);
router.get("/", getTeams);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
