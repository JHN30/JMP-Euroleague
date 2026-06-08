import { useEffect, useRef, useState } from "react";

import { useRound } from "../../hooks/useRound";
import { useTeam } from "../../hooks/useTeam";
import { handleTeamSelect as handleTeamSelectAction } from "../../utils/handleTeamSelect";

const NAVBAR_OFFSET = 96;

const scrollToResults = (resultsElement) => {
  const top = window.scrollY + resultsElement.getBoundingClientRect().top - NAVBAR_OFFSET;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: "smooth",
  });
};

const usePredictionResultsScroll = ({ predictions, showResults, resultsRef }) => {
  useEffect(() => {
    if (!predictions || !showResults || !resultsRef.current) {
      return;
    }

    requestAnimationFrame(() => scrollToResults(resultsRef.current));
  }, [predictions, showResults, resultsRef]);
};

export const usePredictingTeamsViewModel = () => {
  const [selectedHomeTeam, setSelectedHomeTeam] = useState("");
  const [selectedAwayTeam, setSelectedAwayTeam] = useState("");
  const [displayTeams, setDisplayTeams] = useState({ home: "", away: "" });
  const [predictions, setPredictions] = useState();
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);

  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const { fetchRounds, rounds, loadingRounds, errorRounds } = useRound();

  useEffect(() => {
    fetchTeams();
    fetchRounds();
  }, [fetchTeams, fetchRounds]);

  usePredictionResultsScroll({ predictions, showResults, resultsRef });

  const handleTeamSelect = (homeTeam, awayTeam) => {
    handleTeamSelectAction({
      homeTeam,
      awayTeam,
      teams,
      rounds,
      setPredictions,
      setDisplayTeams,
      setShowResults,
    });
  };

  return {
    selectedHomeTeam,
    setSelectedHomeTeam,
    selectedAwayTeam,
    setSelectedAwayTeam,
    displayTeams,
    predictions,
    showResults,
    resultsRef,
    teams,
    isLoading: loadingTeams || loadingRounds,
    error: errorTeams || errorRounds,
    handleTeamSelect,
  };
};
