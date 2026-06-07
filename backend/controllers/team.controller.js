import Team from "../models/team.model.js";

export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ wins: -1, pointsPlusMinus: -1, pointsPlus: -1, pointsMinus: 1, name: 1 });

    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    console.error("Error in getTeams: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }
    res.status(200).json({ success: true, data: team });
  } catch (error) {
    console.error("Error in getTeamById: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
