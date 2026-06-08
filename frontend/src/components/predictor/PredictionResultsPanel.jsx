import PredictionResults from "./PredictionResults";

const PredictionResultsPanel = ({ displayTeams, predictions, resultsRef, showResults }) => {
  if (!predictions || !showResults) {
    return null;
  }

  return (
    <div ref={resultsRef}>
      <PredictionResults predictions={predictions} displayTeams={displayTeams} />
    </div>
  );
};

export default PredictionResultsPanel;
