import express from "express";
import { getRound, createRound, deleteRound, updateRound } from "../controllers/round.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getRound);
router.post("/", verifyToken, createRound);
router.delete("/:id", verifyToken, deleteRound);
router.put("/:id", verifyToken, updateRound);

export default router;
