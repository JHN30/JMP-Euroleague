import mongoose from "mongoose";
import Team from "../models/team.model.js";
import cloudinary from "../lib/cloudinary/cloudinary.js";

export const createTeam = async (req, res) => {
  const { name, form, playedAgainst, homeGround } = req.body; // user will send this data
  let { logoImg } = req.body;

  if (!name || !form || !playedAgainst || !homeGround) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }
  const wins = form.filter((result) => result === "W").length;
  const losses = form.filter((result) => result === "L").length;
  const winPercentage = ((wins / (wins + losses)) * 100).toFixed(2);

  if (logoImg) {
    const uploadedResponse = await cloudinary.uploader.upload(logoImg);
    logoImg = uploadedResponse.secure_url;
  }

  const newTeam = new Team({
    name,
    wins: wins,
    losses: losses,
    winPercentage: winPercentage,
    form,
    playedAgainst,
    homeGround,
    logoImg,
  });

  try {
    await newTeam.save();
    res.status(201).json({ success: true, data: newTeam });
  } catch (error) {
    console.error("Error in createTeam: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find({});
    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    console.error("Error in getTeams: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Team ID" });
    }
    if (!rating) {
      return res.status(400).json({ success: false, message: "Rating not provided" });
    }
    const updatedTeam = await Team.findByIdAndUpdate(id, { rating }, { new: true });
    if (!updatedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.status(200).json({ success: true, data: updateTeam });
  } catch (error) {
    console.log("Error in updateTeam:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }
    if (team.logoImg) {
      const publicId = team.logoImg.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`${publicId}`);
        console.log("Image deleted from Cloudinary successfully");
      } catch (error) {
        console.error("Error deleting image from Cloudinary: ", error.message);
        return res.status(500).json({ success: false, message: "Failed to delete image" });
      }
    }
    await Team.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTeam: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
