import express from "express";
import { getTeams, getTeamByIdentifier } from "../controllers/team.controller.js";

const router = express.Router();

router.get("/", getTeams);
router.get("/:identifier", getTeamByIdentifier);

export default router;
