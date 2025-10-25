import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useTeam } from "../../../hooks/useTeam";

const fillArray = (arr, len) => Array.from({ length: len }, (_, i) => (arr && arr[i] !== undefined ? arr[i] : ""));

const TeamUpdate = ({ team, latestRound, setActiveView, allTeams, onUpdateSuccess }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [result, setResult] = useState(fillArray(team.form, latestRound));
  const [playedAgainst, setPlayedAgainst] = useState(fillArray(team.playedAgainst, latestRound));
  const [homeGround, setHomeGround] = useState(fillArray(team.homeGround, latestRound));
  const [pointsPlus, setPointsPlus] = useState(fillArray(team.pointsPlusArray, latestRound));
  const [pointsMinus, setPointsMinus] = useState(fillArray(team.pointsMinusArray, latestRound));

  const { updateTeam } = useTeam();

  const opponentTeams = allTeams.filter((t) => t._id !== team._id);

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
      await updateTeam(team._id, {
        form: result,
        playedAgainst: playedAgainst,
        homeGround: homeGround,
        pointsPlusArray: pointsPlus,
        pointsMinusArray: pointsMinus,
      });
      onUpdateSuccess?.();
      toast.success(`${team.name} is successfully updated`);
    } catch (error) {
      console.log("Error updating team: ", error);
      toast.error(`Couldn't update ${team.name}. Please try again later`);
    }
  };

  useEffect(() => {
    if (latestRound && latestRound > 0) {
      setCurrentRound(latestRound - 1);
    } else {
      setCurrentRound(0);
    }
  }, [latestRound, team._id]);

  return (
    <div className="flex flex-col m-4 gap-4">
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

      <div className="flex flex-col gap-3 p-4 bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-orange-400">
            Round {currentRound + 1} of {latestRound}
          </h3>
          <div className="flex gap-2">
            <button
              className={`btn btn-sm ${currentRound === 0 ? "btn-disabled" : "btn-outline btn-warning"}`}
              onClick={goToPrevRound}
              disabled={currentRound === 0}
            >
              Previous
            </button>
            <button
              className={`btn btn-sm ${currentRound === latestRound - 1 ? "btn-disabled" : "btn-outline btn-warning"}`}
              onClick={goToNextRound}
              disabled={currentRound === latestRound - 1}
            >
              Next
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: latestRound }).map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-md ${
                currentRound === index ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              } transition duration-200`}
              onClick={() => jumpToRound(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-900 bg-opacity-70 p-4 rounded-lg">
        <div>
          <label htmlFor={`result-${currentRound}`} className="block text-sm font-semibold text-gray-300 mb-2">Result (W/L)</label>
          <input
            type="text"
            id={`result-${currentRound}`}
            value={result[currentRound] || ""}
            onChange={(e) => handleFieldChange("result", e.target.value)}
            placeholder="e.g., W or L"
            className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400 transition duration-200"
          />
        </div>

        <div>
          <label htmlFor={`opponent-${currentRound}`} className="block text-sm font-semibold text-gray-300 mb-2">Opponent</label>
          <select
            id={`opponent-${currentRound}`}
            value={playedAgainst[currentRound] || ""}
            onChange={(e) => handleFieldChange("playedAgainst", e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-white transition duration-200"
          >
            <option value="">Select Opponent</option>
            {opponentTeams.map((oppTeam) => (
              <option key={oppTeam._id} value={oppTeam.name}>
                {oppTeam.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`home-ground-${currentRound}`} className="block text-sm font-semibold text-gray-300 mb-2">Home Ground (H/A)</label>
          <input
            type="text"
            id={`home-ground-${currentRound}`}
            value={homeGround[currentRound] || ""}
            onChange={(e) => handleFieldChange("homeGround", e.target.value)}
            placeholder="e.g., H or A"
            className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400 transition duration-200"
          />
        </div>

        <div>
          <label htmlFor={`points-scored-${currentRound}`} className="block text-sm font-semibold text-gray-300 mb-2">Points Scored</label>
          <input
            type="number"
            id={`points-scored-${currentRound}`}
            value={pointsPlus[currentRound] || ""}
            onChange={(e) => handleFieldChange("pointsPlus", e.target.value)}
            placeholder="e.g., 85"
            className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400 transition duration-200"
          />
        </div>

        <div>
          <label htmlFor={`points-conceded-${currentRound}`} className="block text-sm font-semibold text-gray-300 mb-2">Points Conceded</label>
          <input
            type="number"
            id={`points-conceded-${currentRound}`}
            value={pointsMinus[currentRound] || ""}
            onChange={(e) => handleFieldChange("pointsMinus", e.target.value)}
            placeholder="e.g., 78"
            className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400 transition duration-200"
          />
        </div>
      </div>

      <button
        className="bg-amber-600 hover:bg-amber-500 transition duration-300 rounded-md text-white p-2 text-lg font-semibold"
        onClick={handleUpdate}
      >
        Save All Changes
      </button>
    </div>
  );
};

export default TeamUpdate;
