import mongoose from "mongoose";

import Team from "../models/team.model.js";
import { getTeamSlug } from "../utils/teamSlug.js";

const isMongoObjectId = (value) => /^[a-f\d]{24}$/i.test(value) && mongoose.Types.ObjectId.isValid(value);

export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ wins: -1, pointsPlusMinus: -1, pointsPlus: -1, pointsMinus: 1, name: 1 });

    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    console.error("Error in getTeams: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTeamByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;
    let team = null;

    if (isMongoObjectId(identifier)) {
      team = await Team.findById(identifier);
    }

    if (!team) {
      const requestedSlug = getTeamSlug(identifier);
      const teams = await Team.find();
      team = teams.find((candidate) => getTeamSlug(candidate.name) === requestedSlug);
    }

    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }

    res.status(200).json({ success: true, data: team });
  } catch (error) {
    console.error("Error in getTeamByIdentifier: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
