import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import ErrorBox from "../components/ErrorBox";
import LoadingSpinner from "../components/LoadingSpinner";

import { useTeam2025 } from "../func/useTeam2025";

import { FaCheckDouble } from "react-icons/fa";
import { HiOutlineX } from "react-icons/hi";
import { FaPercentage } from "react-icons/fa";
import { SlGraph } from "react-icons/sl";

const TeamStatsPage = () => {
  const { fetchTeamById, team, loadingTeams, errorTeams } = useTeam2025();
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

  const handleLastFiveGames = () => {
    setGamesToShow(5);
  };

  const handleLastTenGames = () => {
    setGamesToShow(10);
  };

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
            {team.data.name}
          </h1>
        </div>
        <img
          className="flex items-center justify-center w-full h-138 pt-2 pb-2 object-contain"
          src={team.data.logoImg}
          alt={`${team.data.name} logo`}
        />
      </motion.div>
      {/* Stat Cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 w-full pt-2 pb-2">
        <StatsCard
          title="Wins"
          value={team.data.wins}
          icon={FaCheckDouble}
          color="bg-green-400"
          iconColor={"text-emerald-800"}
        />
        <StatsCard
          title="Losses"
          value={team.data.losses}
          icon={HiOutlineX}
          color="bg-red-400"
          iconColor={"text-rose-800"}
        />
        <StatsCard
          title="Win Percentage"
          value={team.data.winPercentage ? `${team.data.winPercentage.toFixed(2)}%` : "0%"}
          icon={FaPercentage}
          color="bg-amber-400"
          iconColor={"text-amber-800"}
        />
        <StatsCard
          title="JMP Rating"
          value={team.data.rating ? team.data.rating.toFixed(0) : "0"}
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
        value={Array.isArray(team.data.form) ? team.data.form : []}
        color="bg-amber-400"
        gridColumns={gamesToShow}
      />
      {/*Title for played against card*/}
      <div className="flex flex-row items-center justify-between p-2 gap-4 bg-neutral w-full rounded-t-lg border-t-2 border-r-2 border-l-2 border-amber-400">
        <p className="flex items-center justify-center text-gray-100 text-2xl p-2 font-bold">Played Against</p>
      </div>
      <PlayedAgainstCard
        teamName={team.data.name}
        opposition={Array.isArray(team.data.playedAgainst) ? team.data.playedAgainst.toReversed() : []}
        homeCourt={Array.isArray(team.data.homeGround) ? team.data.homeGround.toReversed() : []}
        result={Array.isArray(team.data.form) ? team.data.form.toReversed() : []}
      />
    </div>
  );
};

const StatsCard = ({ title, value, icon: Icon, color, iconColor }) => (
  <motion.div
    className={`bg-neutral rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className="text-gray-100 text-md mb-1 font-bold">{title}</p>
        <h3 className="text-white text-3xl font-bold">{value}</h3>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-300 opacity-25" />
    <div className={`absolute -bottom-4 -right-0 opacity-60 ${iconColor}`}>
      <Icon className="h-32 w-32" />
    </div>
  </motion.div>
);

const FormCard = ({ value, color, gridColumns }) => (
  <motion.div
    className={`bg-neutral rounded-b-lg mb-4 shadow-lg overflow-hidden w-full relative`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Array of results */}
    <div className={`flex p-2 gap-2 ${color} justify-between`}>
      {value.length === 0 ? (
        <span className="text-white">No recent results</span>
      ) : (
        value.slice(value.length - gridColumns, value.length).map((result, idx) => (
          <h3 key={idx} className={`text-2xl lg:text-4xl font-bold ${result === "W" ? "text-green-600" : "text-red-600"} `}>
            {result}
          </h3>
        ))
      )}
    </div>
  </motion.div>
);

const PlayedAgainstCard = ({ teamName, opposition, homeCourt, result }) => (
  <motion.div
    className="bg-neutral border-b-2 border-r-2 border-l-2 border-amber-400 rounded-b-lg p-2 shadow-lg overflow-hidden w-full relative"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex flex-col w-full gap-2">
      {opposition.length === 0 ? (
        <span className="text-white">No recent results</span>
      ) : (
        opposition.map((team, idx) => (
          <div
            className="flex flex-col bg-base-100 items-center justify-center border-2 border-amber-400 rounded-2xl p-2"
            key={idx}
          >
            <p className="text-gray-100 text-bold mb-2">Round {opposition.length - idx}</p>
            {/* Matchup Display */}
            <div className="flex flex-row w-full justify-between items-center gap-1 lg:gap-4">
              {/* Home Team */}
              <div className="flex-1 flex justify-end">
                <p
                  className={`text-sm md:text-lg lg:text-2xl font-bold ${
                    homeCourt[idx] === "H" ? "text-white" : "text-gray-400"
                  } text-right`}
                >
                  {homeCourt[idx] === "H" ? teamName : team}
                </p>
              </div>
              {/* Div for results */}
              <div className="flex flex-row mx-4 justify-center items-center">
                {/* Home Team Result */}
                <p
                  className={`flex items-center justify-center size-6 md:size-8 lg:size-10 text-sm md:text-lg lg:text-2xl font-bold text-white rounded-md ${
                    homeCourt[idx] === "H"
                      ? result[idx] === "W"
                        ? "bg-green-600"
                        : "bg-red-600"
                      : result[idx] === "W"
                      ? "bg-red-600"
                      : "bg-green-600"
                  }`}
                >
                  {homeCourt[idx] === "H" ? result[idx] : result[idx] === "W" ? "L" : "W"}
                </p>
                {/* Away Team Result */}
                <p
                  className={`flex items-center justify-center size-6 md:size-8 lg:size-10 text-sm md:text-lg lg:text-2xl font-bold text-white rounded-md ${
                    homeCourt[idx] === "A"
                      ? result[idx] === "W"
                        ? "bg-green-600"
                        : "bg-red-600"
                      : result[idx] === "W"
                      ? "bg-red-600"
                      : "bg-green-600"
                  }`}
                >
                  {homeCourt[idx] === "A" ? result[idx] : result[idx] === "W" ? "L" : "W"}
                </p>
              </div>
              {/* Away Team */}
              <div className="flex-1 flex justify-start">
                <p
                  key={idx}
                  className={` text-sm md:text-lg lg:text-2xl font-bold ${
                    homeCourt[idx] === "A" ? "text-white" : "text-gray-400"
                  }`}
                >
                  {homeCourt[idx] === "A" ? teamName : team}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </motion.div>
);

export default TeamStatsPage;
