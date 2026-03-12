import { useState, useEffect, useRef } from "react";

import ErrorBox from "../errors/ErrorBox";

import { useTeam } from "../../hooks/useTeam";
import { useRound } from "../../hooks/useRound";

import { handleTeamSelect as handleTeamSelectAction } from "../../utils/handleTeamSelect";

import PredictingTeamsSkeleton from "../skeletons/PredictingTeamsSkeleton";

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
  const [homeInjuries, setHomeInjuries] = useState({ stars: 0, starters: 0, keyBench: 0 });
  const [awayInjuries, setAwayInjuries] = useState({ stars: 0, starters: 0, keyBench: 0 });
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);

  const clampProbability = (value) => {
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      return 0;
    }
    return Math.max(0, Math.min(1, numericValue));
  };

  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const { fetchRounds, rounds, loadingRounds, errorRounds } = useRound();

  useEffect(() => {
    fetchTeams(DEFAULT_SEASON);
    fetchRounds();
  }, [fetchTeams, fetchRounds]);

  useEffect(() => {
    if (!predictions || !showResults || !resultsRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      const navbarOffset = 96;
      const top = window.scrollY + resultsRef.current.getBoundingClientRect().top - navbarOffset;
      window.scrollTo({
        top: Math.max(top, 0),
        behavior: "smooth",
      });
    });
  }, [predictions, showResults]);

  if (loadingTeams || loadingRounds) {
    return <PredictingTeamsSkeleton />;
  }

  if (errorTeams || errorRounds) {
    return (
      <div className="flex h-full w-full items-center justify-center">
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
      clampProbability,
      setPredictions,
      setDisplayTeams,
      setShowResults,
    });
  };

  return (
    <div className="flex flex-col gap-6">
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
          onHomeChange={setHomeInjuries}
          onAwayChange={setAwayInjuries}
        />
      </MatchSetupSection>

      {predictions && showResults && (
        <div ref={resultsRef}>
          <PredictionResults predictions={predictions} displayTeams={displayTeams} />
        </div>
      )}
    </div>
  );
};

export default PredictingTeams;
