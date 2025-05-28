import { useState, useEffect } from "react";

import LoadingSpinner from "./LoadingSpinner";
import ErrorBox from "./ErrorBox";
import { useTeam } from "../func/useTeam";
import { useRound } from "../func/useRound";
import { calculateExpectedScorePredictor } from "../utils/calculateExpectedScore";

const PredictingTeams = () => {
  const [selectedHomeTeam, setSelectedHomeTeam] = useState("");
  const [selectedAwayTeam, setSelectedAwayTeam] = useState("");
  const [displayTeams, setDisplayTeams] = useState({ home: "", away: "" });
  const [predictions, setPredictions] = useState();

  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const { fetchRounds, rounds, loadingRounds, errorRounds } = useRound();

  // Fetch data when the component mounts
  useEffect(() => {
    fetchTeams();
    fetchRounds();
  }, [fetchTeams, fetchRounds]);

  if (loadingTeams || loadingRounds) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (errorTeams || errorRounds) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <ErrorBox error={errorTeams} />
        <ErrorBox error={errorRounds} />
      </div>
    );
  }

  const handleTeamSelect = async (homeTeam, awayTeam) => {
    if (!homeTeam || !awayTeam) return;

    const homeTeamData = teams.data.find((team) => team.name === homeTeam);
    const awayTeamData = teams.data.find((team) => team.name === awayTeam);

    const round = rounds.data[0].currentRound;

    const homeArrayFormAdvantage =
      homeTeamData.form[round - 1] === undefined
        ? []
        : homeTeamData.form.slice(round - 5 <= 0 ? 0 : round - 5, round === 0 ? 1 : round);

    const awayArrayFormAdvantage =
      awayTeamData.form[round - 1] === undefined
        ? []
        : awayTeamData.form.slice(round - 5 <= 0 ? 0 : round - 5, round === 0 ? 1 : round);

    const homeFormAdvantage =
      homeArrayFormAdvantage.length === 0
        ? 0
        : homeArrayFormAdvantage.filter((result) => result === "W").length / homeArrayFormAdvantage.length;

    const awayFormAdvantage =
      awayArrayFormAdvantage.length === 0
        ? 0
        : awayArrayFormAdvantage.filter((result) => result === "W").length / awayArrayFormAdvantage.length;

    if (homeTeamData && awayTeamData) {
      const prediction = calculateExpectedScorePredictor(
        homeTeamData.rating,
        awayTeamData.rating,
        homeFormAdvantage,
        awayFormAdvantage
      );
      setPredictions(prediction);
      setDisplayTeams({ home: homeTeam, away: awayTeam });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-4 p-2">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => setSelectedHomeTeam(e.target.value)}
            value={selectedHomeTeam}
          >
            <option disabled value="">
              Home Team
            </option>
            {teams?.data
              .filter((team) => team.name !== selectedAwayTeam)
              .map((team) => (
                <option key={team.name} value={team.name}>
                  {team.name}
                </option>
              ))}
          </select>
          <span className="text-xl font-bold">VS</span>
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => setSelectedAwayTeam(e.target.value)}
            value={selectedAwayTeam}
          >
            <option disabled value="">
              Away Team
            </option>
            {teams?.data
              .filter((team) => team.name !== selectedHomeTeam)
              .map((team) => (
                <option key={team.name} value={team.name}>
                  {team.name}
                </option>
              ))}
          </select>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => handleTeamSelect(selectedHomeTeam, selectedAwayTeam)}
          disabled={!selectedHomeTeam || !selectedAwayTeam}
        >
          Calculate Prediction
        </button>
      </div>
      {predictions && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Prediction Results:</h3>
          <p className="mt-2">
            <b>{displayTeams.home}</b> has <b>{(predictions.homeTeam * 100).toFixed(2)}%</b> of winning.
          </p>
          <p className="mt-2">
            <b>{displayTeams.away}</b> has <b>{(predictions.awayTeam * 100).toFixed(2)}%</b> of winning.
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictingTeams;
