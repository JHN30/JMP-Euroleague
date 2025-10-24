import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import ErrorBox from "../errors/ErrorBox";
import AnimatedNumber from "../features/AnimatedNumber";
import { useTeam } from "../../hooks/useTeam";
import { useRound } from "../../hooks/useRound";
import { calculateExpectedScorePredictor } from "../../utils/calculateExpectedScore";
import PredictingTeamsSkeleton from "../skeletons/PredictingTeamsSkeleton";

const PredictingTeams = () => {
  const [selectedHomeTeam, setSelectedHomeTeam] = useState("");
  const [selectedAwayTeam, setSelectedAwayTeam] = useState("");
  const [displayTeams, setDisplayTeams] = useState({ home: "", away: "" });
  const [predictions, setPredictions] = useState();
  const [homeInjuries, setHomeInjuries] = useState(0);
  const [awayInjuries, setAwayInjuries] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const DEFAULT_SEASON = "2025";
  const clampProbability = (value) => {
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      return 0;
    }
    return Math.max(0, Math.min(1, numericValue));
  };
  const sanitizeInjuryValue = (value) => {
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      return 0;
    }

    return Math.max(0, Math.min(5, numericValue));
  };

  const handleHomeInjuriesChange = (event) => {
    setHomeInjuries(sanitizeInjuryValue(event.target.value));
  };

  const handleAwayInjuriesChange = (event) => {
    setAwayInjuries(sanitizeInjuryValue(event.target.value));
  };

  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const { fetchRounds, rounds, loadingRounds, errorRounds } = useRound();

  // Fetch data when the component mounts
  useEffect(() => {
    fetchTeams(DEFAULT_SEASON);
    fetchRounds();
  }, [fetchTeams, fetchRounds]);

  if (loadingTeams || loadingRounds) {
    return (
      <div className="flex items-center justify-center h-full w-full p-2">
        <PredictingTeamsSkeleton />
      </div>
    );
  }

  if (errorTeams || errorRounds) {
    return (
      <div className="flex items-center justify-center h-full w-full py-4">
        <ErrorBox error={errorTeams || errorRounds} />
      </div>
    );
  }

  const handleTeamSelect = async (homeTeam, awayTeam) => {
    if (!homeTeam || !awayTeam) return;

    const sanitizedHomeInjuries = sanitizeInjuryValue(homeInjuries);
    const sanitizedAwayInjuries = sanitizeInjuryValue(awayInjuries);
    setHomeInjuries(sanitizedHomeInjuries);
    setAwayInjuries(sanitizedAwayInjuries);

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
        homeTeamData.rating2,
        awayTeamData.rating2,
        homeFormAdvantage,
        awayFormAdvantage,
        sanitizedHomeInjuries,
        sanitizedAwayInjuries
      );
      setPredictions({
        ...prediction,
        homeTeam: clampProbability(prediction?.homeTeam),
        awayTeam: clampProbability(prediction?.awayTeam),
      });
      setDisplayTeams({
        home: homeTeam,
        away: awayTeam,
        homeData: homeTeamData,
        awayData: awayTeamData,
      });
      setShowResults(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center p-4 min-h-screen bg-gradient-to-br from-base-100 to-base-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main Selection Card */}
      <motion.div
        className="card bg-base-100 shadow-2xl border border-orange-200 max-w-2xl w-full"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center justify-center mb-6 text-orange-400">Match Predictor</h2>

          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
            {/* Home Team Selection */}
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-medium text-gray-600">Home Team</label>
              <select
                className="select select-bordered w-full max-w-xs focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                onChange={(e) => setSelectedHomeTeam(e.target.value)}
                value={selectedHomeTeam}
              >
                <option disabled value="">
                  Select Home Team
                </option>
                {teams?.data
                  .filter((team) => team.name !== selectedAwayTeam)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((team) => (
                    <option key={team.name} value={team.name}>
                      {team.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* VS Divider */}
            <motion.div
              className="flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent lg:mt-6">
                VS
              </span>
            </motion.div>

            {/* Away Team Selection */}
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-medium text-gray-600">Away Team</label>
              <select
                className="select select-bordered w-full max-w-xs focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                onChange={(e) => setSelectedAwayTeam(e.target.value)}
                value={selectedAwayTeam}
              >
                <option disabled value="">
                  Select Away Team
                </option>
                {teams?.data
                  .filter((team) => team.name !== selectedHomeTeam)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((team) => (
                    <option key={team.name} value={team.name}>
                      {team.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Injuries Input */}
          <div className="flex flex-row justify-center items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-medium text-gray-600">Home Player/s Injured</label>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                min={0}
                max={5}
                step={1}
                onChange={handleHomeInjuriesChange}
                value={homeInjuries}
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-medium text-gray-600">Away Player/s Injured</label>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                min={0}
                max={5}
                step={1}
                onChange={handleAwayInjuriesChange}
                value={awayInjuries}
              />
            </div>
          </div>

          <motion.button
            className="btn bg-orange-400 hover:bg-orange-500 text-white font-bold mt-6 transition-all duration-300"
            onClick={() => handleTeamSelect(selectedHomeTeam, selectedAwayTeam)}
            disabled={!selectedHomeTeam || !selectedAwayTeam}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Calculate Prediction
          </motion.button>
        </div>
      </motion.div>

      {/* Results Section */}
      {predictions && showResults && (
        <motion.div
          className="mt-4 w-full max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-center mb-3 text-orange-400">Prediction Results</h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Home Team Result Card */}
            <motion.div
              className="card bg-base-100 shadow-xl border-l-4 border-l-green-400"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={displayTeams.homeData?.logoImg}
                    alt={`${displayTeams.home} logo`}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h4 className="text-xl font-bold">{displayTeams.home}</h4>
                    <span className="badge badge-secondary">HOME</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    <AnimatedNumber value={predictions.homeTeam * 100} />%
                  </div>
                  <div className="text-sm text-gray-600 mb-4">Win Probability</div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <motion.div
                      className="bg-green-400 h-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${predictions.homeTeam * 100}%` }}
                      transition={{ duration: 2, delay: 0.8 }}
                    />
                  </div>

                  <div
                    className={`text-lg font-semibold ${predictions.homeTeam > 0.5 ? "text-green-600" : "text-gray-600"}`}
                  >
                    {predictions.homeTeam > 0.6 ? "Favored" : predictions.homeTeam > 0.4 ? "Even Match" : "Underdog"}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Away Team Result Card */}
            <motion.div
              className="card bg-base-100 shadow-xl border-l-4 border-l-blue-400"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={displayTeams.awayData?.logoImg}
                    alt={`${displayTeams.away} logo`}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h4 className="text-xl font-bold">{displayTeams.away}</h4>
                    <span className="badge badge-accent">AWAY</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    <AnimatedNumber value={predictions.awayTeam * 100} />%
                  </div>
                  <div className="text-sm text-gray-600 mb-4">Win Probability</div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <motion.div
                      className="bg-blue-400 h-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${predictions.awayTeam * 100}%` }}
                      transition={{ duration: 2, delay: 0.8 }}
                    />
                  </div>

                  <div className={`text-lg font-semibold ${predictions.awayTeam > 0.5 ? "text-blue-600" : "text-gray-600"}`}>
                    {predictions.awayTeam > 0.6 ? "Favored" : predictions.awayTeam > 0.4 ? "Even Match" : "Underdog"}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PredictingTeams;
