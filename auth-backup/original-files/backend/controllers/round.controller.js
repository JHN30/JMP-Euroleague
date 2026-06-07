import mongoose from "mongoose";
import Round from "../models/round.model.js";

export const getRound = async (req, res) => {
  try {
    const round = await Round.find({});
    res.status(200).json({ success: true, data: round });
  } catch (error) {
    console.log("Error in getRound:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createRound = async (req, res) => {
  try {
    const { currentRound, latestRound } = req.body;
    const round = await Round.create({ currentRound, latestRound });
    res.status(201).json({ success: true, data: round });
  } catch (error) {
    console.log("Error in createRound:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteRound = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Round ID" });
    }
    const round = await Round.findByIdAndDelete(id);
    if (!round) {
      return res.status(404).json({ error: "Round not found" });
    }
    res.status(200).json({ message: "Round deleted successfully" });
  } catch (error) {
    console.log("Error in deleteRound:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateRound = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentRound, latestRound } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Round ID" });
    }
    const round = await Round.findByIdAndUpdate(id, { currentRound, latestRound }, { new: true });
    if (!round) {
      return res.status(404).json({ error: "Round not found" });
    }
    res.status(200).json({ success: true, data: round });
  } catch (error) {
    console.log("Error in updateRound:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
