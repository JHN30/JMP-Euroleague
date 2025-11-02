import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import ErrorBox from "../errors/ErrorBox";

import { useTeam } from "../../hooks/useTeam";
import { useRound } from "../../hooks/useRound";

import { handleTeamSelect as handleTeamSelectAction } from "../../utils/handleTeamSelect";

import PredictingTeamsSkeleton from "../skeletons/PredictingTeamsSkeleton";

import { pageCardClass } from "../layout/PageShell";

import MatchSetupSection from "./MatchSetupSection";
import TeamSelection from "./TeamSelection";
import InjuryInputs from "./InjuryInputs";
import PredictionResults from "./PredictionResults";
import { DEFAULT_SEASON } from "../../constants/appConstants";

const PredictingTeams = () => {
  const [selectedHomeTeam, setSelectedHomeTeam] = useState("");
  const [selectedAwayTeam, setSelectedAwayTeam] = useState("");
  const [displayTeams, setDisplayTeams] = useState({ home: "", away: "" });
  const [predictions, setPredictions] = useState();
  const [homeInjuries, setHomeInjuries] = useState("");
  const [awayInjuries, setAwayInjuries] = useState("");
  const [showResults, setShowResults] = useState(false);
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

  const handleHomeInjuryValue = (value) => {
    if (value === "" || typeof value === "string") {
      setHomeInjuries(value);
    }
  };

  const handleAwayInjuryValue = (value) => {
    if (value === "" || typeof value === "string") {
      setAwayInjuries(value);
    }
  };

  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const { fetchRounds, rounds, loadingRounds, errorRounds } = useRound();

  useEffect(() => {
    fetchTeams(DEFAULT_SEASON);
    fetchRounds();
  }, [fetchTeams, fetchRounds]);

  if (loadingTeams || loadingRounds) {
    return <PredictingTeamsSkeleton />;
  }

  if (errorTeams || errorRounds) {
    return (
      <div className={`${pageCardClass} flex min-h-[280px] items-center justify-center px-6 py-12`}>
        <ErrorBox error={errorTeams || errorRounds} />
      </div>
    );
  }

  const handleTeamSelect = (homeTeam, awayTeam) => {
    handleTeamSelectAction({
      homeTeam,
      awayTeam,
      teams,
      rounds,
      homeInjuries,
      awayInjuries,
      sanitizeInjuryValue,
      clampProbability,
      setHomeInjuries,
      setAwayInjuries,
      setPredictions,
      setDisplayTeams,
      setShowResults,
    });
  };

  return (
    <motion.div
      className="flex flex-col gap-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MatchSetupSection
        onCalculate={() => handleTeamSelect(selectedHomeTeam, selectedAwayTeam)}
        isCalculateDisabled={!selectedHomeTeam || !selectedAwayTeam}
      >
        <TeamSelection
          teams={teams}
          selectedHomeTeam={selectedHomeTeam}
          selectedAwayTeam={selectedAwayTeam}
          onSelectHome={(e) => setSelectedHomeTeam(e.target.value)}
          onSelectAway={(e) => setSelectedAwayTeam(e.target.value)}
        />
        <InjuryInputs
          homeInjuries={homeInjuries}
          awayInjuries={awayInjuries}
          onHomeChange={handleHomeInjuryValue}
          onAwayChange={handleAwayInjuryValue}
        />
      </MatchSetupSection>

      {predictions && showResults && <PredictionResults predictions={predictions} displayTeams={displayTeams} />}
    </motion.div>
  );
};

export default PredictingTeams;
