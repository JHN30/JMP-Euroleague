import express from "express";
import { getTeams, getTeamById } from "../controllers/team.controller.js";

const router = express.Router();

router.get("/", getTeams);
router.get("/:id", getTeamById);

export default router;
