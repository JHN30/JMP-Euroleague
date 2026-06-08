import MatchSetupSection from "./MatchSetupSection";
import PredictionResultsPanel from "./PredictionResultsPanel";
import PredictingTeamsStatus from "./PredictingTeamsStatus";
import TeamSelection from "./TeamSelection";
import { usePredictingTeamsViewModel } from "./usePredictingTeamsViewModel";

const PredictingTeams = () => {
  const {
    displayTeams,
    error,
    handleTeamSelect,
    isLoading,
    predictions,
    resultsRef,
    selectedAwayTeam,
    selectedHomeTeam,
    setSelectedAwayTeam,
    setSelectedHomeTeam,
    showResults,
    teams,
  } = usePredictingTeamsViewModel();

  return (
    <PredictingTeamsStatus isLoading={isLoading} error={error}>
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
        </MatchSetupSection>

        <PredictionResultsPanel
          displayTeams={displayTeams}
          predictions={predictions}
          resultsRef={resultsRef}
          showResults={showResults}
        />
      </div>
    </PredictingTeamsStatus>
  );
};

export default PredictingTeams;
