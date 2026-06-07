import express from "express";
import { getRound } from "../controllers/round.controller.js";

const router = express.Router();

router.get("/", getRound);

export default router;
