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

const TeamUpdate = ({ team, latestRound, setActiveView }) => {
  const [result, setResult] = useState(fillArray(team.form, latestRound));
  const [playedAgainst, setPlayedAgainst] = useState(fillArray(team.playedAgainst, latestRound));
  const [homeGround, setHomeGround] = useState(fillArray(team.homeGround, latestRound));

  const { updateTeam } = useTeam2025();

  // Handlers for updating state
  const handleResultChange = (idx, value) => {
    setResult((prev) => prev.map((item, i) => (i === idx ? value : item)));
  };
  const handlePlayedAgainstChange = (idx, value) => {
    setPlayedAgainst((prev) => prev.map((item, i) => (i === idx ? value : item)));
  };
  const handleHomeGroundChange = (idx, value) => {
    setHomeGround((prev) => prev.map((item, i) => (i === idx ? value : item)));
  };

  // Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (result.some((val) => !val) || playedAgainst.some((val) => !val) || homeGround.some((val) => !val)) {
      toast.error("All fields must be filled!");
      return;
    }
    try {
      console.log(result, playedAgainst, homeGround);
      await updateTeam(team._id, { form: result, playedAgainst: playedAgainst, homeGround: homeGround });
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
      {/* Form */}
      <div>
        {/* Results */}
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">Team Results</div>
          <div className="collapse-content text-sm">
            <InputField data={result} latestRound={latestRound} onChange={handleResultChange} />
          </div>
        </div>
        {/* Played Against */}
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">Played Against</div>
          <div className="collapse-content text-sm">
            <InputField data={playedAgainst} latestRound={latestRound} onChange={handlePlayedAgainstChange} />
          </div>
        </div>
        {/* Home Ground */}
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">Home Ground</div>
          <div className="collapse-content text-sm">
            <InputField data={homeGround} latestRound={latestRound} onChange={handleHomeGroundChange} />
          </div>
        </div>
      </div>
      {/* Update Button */}
      <button
        className="bg-amber-600 hover:bg-amber-500 transition duration-300 rounded-md text-white p-2"
        onClick={handleUpdate}
      >
        Update
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
      {activeView === "team" && <TeamUpdate team={team} latestRound={latestRound} setActiveView={setActiveView} />}
    </>
  );
};

export default UpdateTeamPage;
