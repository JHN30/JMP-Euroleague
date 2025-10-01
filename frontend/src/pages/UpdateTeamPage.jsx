import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { MdInput } from "react-icons/md";
import React from "react";
import toast from "react-hot-toast";

import { useTeam2025 } from "../hooks/useTeam2025";
import TeamCard from "../components/cards/TeamCard";

const Grid = ({ sortedTeams, handleClick }) => {
  return (
    <motion.div
      className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2 m-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {sortedTeams.map((team, idx) => {
        return (
          <button onClick={() => handleClick(team)} className="block h-full hover:cursor-pointer" key={team.name}>
            <TeamCard team={team} />
          </button>
        );
      })}
    </motion.div>
  );
};

const InputField = React.memo(({ data, latestRound, onChange }) => {
  const inputRefs = useRef([]);

  // Handler for key down event
  const handleKeyDown = (e, idx) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Move to next input if exists
      if (inputRefs.current[idx + 1]) {
        inputRefs.current[idx + 1].focus();
      }
    }
  };

  return (
    <div className="flex flex-col justify-items-center text-white text-base font-bold">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 m-1 ">
        {Array.from({ length: latestRound }).map((_, idx) => (
          <div key={idx} className="flex flex-row items-center gap-1">
            {idx + 1}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <MdInput className="size-4 text-orange-400" />
              </div>
              <input
                type="text"
                value={data[idx]}
                required
                ref={(el) => (inputRefs.current[idx] = el)}
                onChange={(e) => onChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-full pl-8 pr-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400 transition duration-200"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

const fillArray = (arr, len) => Array.from({ length: len }, (_, i) => (arr && arr[i] !== undefined ? arr[i] : ""));

const TeamUpdate = ({ team, latestRound, setActiveView, allTeams }) => {
  const [currentRound, setCurrentRound] = useState(0); // Track which round we're editing
  const [result, setResult] = useState(fillArray(team.form, latestRound));
  const [playedAgainst, setPlayedAgainst] = useState(fillArray(team.playedAgainst, latestRound));
  const [homeGround, setHomeGround] = useState(fillArray(team.homeGround, latestRound));
  const [pointsPlus, setPointsPlus] = useState(fillArray(team.pointsPlusArray, latestRound));
  const [pointsMinus, setPointsMinus] = useState(fillArray(team.pointsMinusArray, latestRound));

  const { updateTeam } = useTeam2025();

  // Filter out the current team from opponent options
  const opponentTeams = allTeams.filter((t) => t._id !== team._id);

  // Single update handler that works with current round
  const handleFieldChange = (field, value) => {
    const setters = {
      result: setResult,
      playedAgainst: setPlayedAgainst,
      homeGround: setHomeGround,
      pointsPlus: setPointsPlus,
      pointsMinus: setPointsMinus,
    };
    setters[field]((prev) => prev.map((item, i) => (i === currentRound ? value : item)));
  };

  // Navigation
  const goToNextRound = () => {
    if (currentRound < latestRound - 1) {
      setCurrentRound((prev) => prev + 1);
    }
  };

  const goToPrevRound = () => {
    if (currentRound > 0) {
      setCurrentRound((prev) => prev - 1);
    }
  };

  const jumpToRound = (roundIndex) => {
    setCurrentRound(roundIndex);
  };

  // Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (
      result.some((val) => !val) ||
      playedAgainst.some((val) => !val) ||
      homeGround.some((val) => !val) ||
      pointsPlus.some((val) => !val) ||
      pointsMinus.some((val) => !val)
    ) {
      toast.error("All fields must be filled!");
      return;
    }
    try {
      console.log(result, playedAgainst, homeGround, pointsPlus, pointsMinus);
      await updateTeam(team._id, {
        form: result,
        playedAgainst: playedAgainst,
        homeGround: homeGround,
        pointsPlusArray: pointsPlus,
        pointsMinusArray: pointsMinus,
      });
      toast.success(`${team.name} is successfully updated`);
    } catch (error) {
      console.log("Error updating team: ", error);
      toast.error(`Couldn't update ${team.name}. Please try again later`);
    }
  };

  return (
    <div className="flex flex-col m-4 gap-4">
      {/* Team Info and Go Back */}
      <div className="flex flex-row justify-between p-4 border-2 border-orange-400 rounded-md">
        <div className="flex flex-row items-center justify-center">
          <img
            src={team.logoImg}
            className="flex items-center justify-center object-contain w-12 h-12 mr-2"
            alt={`${team.name} logo`}
          />
          <h2 className="flex items-center justify-center text-white text-base font-bold">{team.name}</h2>
        </div>
        <button
          className="bg-amber-600 hover:bg-amber-500 transition duration-300 rounded-md text-white p-2"
          onClick={() => setActiveView("grid")}
        >
          Go Back
        </button>
      </div>

      {/* Round Navigation */}
      <div className="flex flex-col gap-3 p-4 bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-orange-400">
            Round {currentRound + 1} of {latestRound}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={goToPrevRound}
              disabled={currentRound === 0}
              className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            <button
              onClick={goToNextRound}
              disabled={currentRound === latestRound - 1}
              className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Quick Jump */}
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: latestRound }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpToRound(idx)}
              className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                idx === currentRound
                  ? "bg-orange-400 text-white"
                  : result[idx] && playedAgainst[idx] && homeGround[idx] && pointsPlus[idx] && pointsMinus[idx]
                  ? "bg-green-600 text-white hover:bg-green-500"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Single Round Form */}
      <div className="p-4 bg-gray-900 rounded-lg space-y-4">
        {/* Result */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Team Result (W/L)</label>
          <input
            type="text"
            value={result[currentRound] || ""}
            onChange={(e) => handleFieldChange("result", e.target.value)}
            placeholder="e.g., W or L"
            className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400 transition duration-200"
          />
        </div>

        {/* Played Against */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Played Against</label>
          <select
            value={playedAgainst[currentRound] || ""}
            onChange={(e) => handleFieldChange("playedAgainst", e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-white transition duration-200"
          >
            <option value="" disabled>
              Select opponent team
            </option>
            {opponentTeams.map((t) => (
              <option key={t._id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Home Ground */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Home Ground (H/A)</label>
          <input
            type="text"
            value={homeGround[currentRound] || ""}
            onChange={(e) => handleFieldChange("homeGround", e.target.value)}
            placeholder="e.g., H or A"
            className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400 transition duration-200"
          />
        </div>

        {/* Points Plus */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Points Scored</label>
          <input
            type="number"
            value={pointsPlus[currentRound] || ""}
            onChange={(e) => handleFieldChange("pointsPlus", e.target.value)}
            placeholder="e.g., 85"
            className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400 transition duration-200"
          />
        </div>

        {/* Points Minus */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Points Conceded</label>
          <input
            type="number"
            value={pointsMinus[currentRound] || ""}
            onChange={(e) => handleFieldChange("pointsMinus", e.target.value)}
            placeholder="e.g., 78"
            className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400 transition duration-200"
          />
        </div>
      </div>

      {/* Update Button */}
      <button
        className="bg-amber-600 hover:bg-amber-500 transition duration-300 rounded-md text-white p-2 text-lg font-semibold"
        onClick={handleUpdate}
      >
        Save All Changes
      </button>
    </div>
  );
};

const UpdateTeamPage = ({ teams, rounds }) => {
  const [activeView, setActiveView] = useState("grid");
  const [team, setTeam] = useState({});

  const sortConfig = {
    key: "name",
  };

  const sortedTeams = useMemo(() => {
    return [...teams.data].sort((a, b) => {
      let aValue, bValue;
      aValue = a[sortConfig.key];
      bValue = b[sortConfig.key];

      return aValue > bValue ? 1 : -1;
    });
  }, [teams.data, sortConfig.key]);

  const latestRound = rounds?.data[0]?.latestRound;

  const handleClick = (team) => {
    setTeam(team);
    setActiveView("team");
  };

  return (
    <>
      {activeView === "grid" && <Grid sortedTeams={sortedTeams} handleClick={handleClick} />}
      {activeView === "team" && (
        <TeamUpdate team={team} latestRound={latestRound} setActiveView={setActiveView} allTeams={sortedTeams} />
      )}
    </>
  );
};

export default UpdateTeamPage;
