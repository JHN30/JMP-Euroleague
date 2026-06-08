import ErrorBox from "../errors/ErrorBox";
import PredictingTeamsSkeleton from "../skeletons/PredictingTeamsSkeleton";

const PredictingTeamsError = ({ error }) => (
  <div className="flex h-full w-full items-center justify-center">
    <ErrorBox error={error} />
  </div>
);

const PredictingTeamsStatus = ({ children, error, isLoading }) => {
  if (isLoading) {
    return <PredictingTeamsSkeleton />;
  }

  if (error) {
    return <PredictingTeamsError error={error} />;
  }

  return children;
};

export default PredictingTeamsStatus;
