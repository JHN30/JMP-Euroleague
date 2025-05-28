import express from "express";
import { getRound, createRound, deleteRound, updateRound } from "../controllers/round.controller.js";

const router = express.Router();

router.get("/", getRound);
router.post("/", createRound);
router.delete("/:id", deleteRound);
router.put("/:id", updateRound);

export default router;
