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
