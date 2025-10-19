import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import ErrorBox from "../components/errors/ErrorBox";
import LoadingSpinner from "../components/common/LoadingSpinner";
import StatsCard from "../components/cards/StatsCard";
import FormCard from "../components/cards/FormCard";
import PlayedAgainstCard from "../components/cards/PlayedAgainstCard";

import { useTeam } from "../hooks/useTeam";

import { FaCheckDouble } from "react-icons/fa";
import { HiOutlineX } from "react-icons/hi";
import { FaPercentage } from "react-icons/fa";
import { SlGraph } from "react-icons/sl";
import { FaBasketball } from "react-icons/fa6";

const TeamStatsPage = () => {
  const { fetchTeamById, team, loadingTeams, errorTeams } = useTeam();
  const { teamId } = useParams();
  const [gamesToShow, setGamesToShow] = useState(5);

  useEffect(() => {
    fetchTeamById(teamId);
  }, [fetchTeamById, teamId]);

  if (loadingTeams) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <LoadingSpinner />
      </div>
    );
  }

  // Check if there was an error fetching the teams
  if (errorTeams) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <ErrorBox error={errorTeams} />
      </div>
    );
  }

  const teamData = team?.data ?? {};
  const selectedSeason = String(teamData.season ?? "");
  const isLegacySeason = selectedSeason === "2024";
  const ratingLabel = isLegacySeason ? "JMP Rating 1.0" : "JMP Rating 2.0";
  const rawRatingValue = isLegacySeason ? Number(teamData.rating) : Number(teamData.rating2);
  const ratingValueDisplay = Number.isFinite(rawRatingValue) ? rawRatingValue.toFixed(0) : "0";

  const handleLastFiveGames = () => {
    setGamesToShow(5);
  };

  const handleLastTenGames = () => {
    setGamesToShow(10);
  };

  const oppositionArray = Array.isArray(teamData.playedAgainst) ? teamData.playedAgainst.slice().reverse() : [];
  const homeCourtArray = Array.isArray(teamData.homeGround) ? teamData.homeGround.slice().reverse() : [];
  const resultArray = Array.isArray(teamData.form) ? teamData.form.slice().reverse() : [];
  const pointsForArray = Array.isArray(teamData.pointsPlusArray) ? teamData.pointsPlusArray.slice().reverse() : [];
  const pointsAgainstArray = Array.isArray(teamData.pointsMinusArray) ? teamData.pointsMinusArray.slice().reverse() : [];

  return (
    <div className="flex flex-col items-center justify-center p-2">
      {/* Team Name and Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-neutral w-full rounded-2xl"
      >
        <div className="bg-orange-400 p-4 items-center justify-center rounded-t-md">
          <h1 className="flex items-center justify-center text-white text-2xl font-bold tracking-widest font-stretch-ultra-expanded">
            {teamData.name}
          </h1>
        </div>
        <img
          className="flex items-center justify-center w-full h-138 pt-2 pb-2 object-contain"
          src={teamData.logoImg}
          alt={`${teamData.name} logo`}
        />
      </motion.div>
      {/* Stat Cards */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 w-full pt-2 pb-2">
        <StatsCard
          title="Wins"
          value={teamData.wins}
          icon={FaCheckDouble}
          color="bg-green-400"
          iconColor={"text-emerald-800"}
        />
        <StatsCard
          title="Losses"
          value={teamData.losses}
          icon={HiOutlineX}
          color="bg-red-400"
          iconColor={"text-rose-800"}
        />
        <StatsCard
          title="Win Percentage"
          value={teamData.winPercentage ? `${teamData.winPercentage.toFixed(2)}%` : "0%"}
          icon={FaPercentage}
          color="bg-amber-400"
          iconColor={"text-amber-800"}
        />
        <StatsCard
          title="PTS+"
          value={teamData.pointsPlus}
          icon={FaBasketball}
          color="bg-amber-400"
          iconColor={"text-amber-800"}
        />
        <StatsCard
          title="PTS-"
          value={teamData.pointsMinus}
          icon={FaBasketball}
          color="bg-amber-400"
          iconColor={"text-amber-800"}
        />
        <StatsCard
          title={ratingLabel}
          value={ratingValueDisplay}
          icon={SlGraph}
          color="bg-amber-400"
          iconColor={"text-amber-800"}
        />
      </div>
      {/* Buttons and Title for form card*/}
      <div className="flex flex-row items-center justify-between p-2 gap-4 bg-neutral w-full rounded-t-lg border-t-2 border-r-2 border-l-2 border-amber-400">
        <p className="flex items-center justify-center text-gray-100 text-2xl p-2 font-bold">Form</p>
        <div className="flex flex-row items-center justify-center gap-2">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex gap-3 items-center py-3 px-4 bg-gradient-to-r from-orange-400 to-amber-400 text-white font-bold rounded-lg shadow-lg hover:from-orange-500 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            onClick={handleLastFiveGames}
          >
            Last 5 games
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLastTenGames}
            className="flex gap-3 items-center py-3 px-4 bg-gradient-to-r from-orange-400 to-amber-400 text-white font-bold rounded-lg shadow-lg hover:from-orange-500 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          >
            Last 10 games
          </motion.button>
        </div>
      </div>
      <FormCard
        title="Form"
        value={Array.isArray(teamData.form) ? teamData.form : []}
        color="bg-amber-400"
        gridColumns={gamesToShow}
      />
      {/*Title for played against card*/}
      <div className="flex flex-row items-center justify-between p-2 gap-4 bg-neutral w-full rounded-t-lg border-t-2 border-r-2 border-l-2 border-amber-400">
        <p className="flex items-center justify-center text-gray-100 text-2xl p-2 font-bold">Played Against</p>
      </div>
      <PlayedAgainstCard
        teamName={teamData.name}
        opposition={oppositionArray}
        homeCourt={homeCourtArray}
        result={resultArray}
        pointsFor={pointsForArray}
        pointsAgainst={pointsAgainstArray}
      />
    </div>
  );
};

export default TeamStatsPage;
