import { useState, useRef, useEffect } from "react";
import { useTeam } from "../hooks/useTeam";
import { useRound } from "../hooks/useRound";
import { calculateAndUpdateRatings } from "../utils/ratingsCalculator";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorBox from "../components/errors/ErrorBox";

const UpdateTeamRatingPage = () => {
  const { fetchTeams, updateTeamRating, teams, loadingTeams, errorTeams } = useTeam();
  const { fetchRounds, updateRound, rounds, loadingRounds, errorRounds } = useRound();
  const [status, setStatus] = useState(null);
  const [oldRatings, setOldRatings] = useState([]);
  const [updatedRatings, setUpdatedRatings] = useState([]);
  const calculationDoneRef = useRef(false);

  useEffect(() => {
    fetchTeams();
    fetchRounds();
  }, [fetchTeams, fetchRounds]);

  if (loadingTeams || loadingRounds) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  const handleUpdate = async () => {
    try {
      if (!calculationDoneRef.current && teams?.data?.length > 0 && rounds?.data?.[0] && !loadingTeams && !loadingRounds) {
        const dbCurrentRound = rounds.data[0].currentRound;
        const dbLatestRound = rounds.data[0].latestRound;
        if (dbCurrentRound < dbLatestRound) {
          setStatus("Running rating update...");
          await calculateAndUpdateRatings(
            dbCurrentRound,
            dbLatestRound,
            teams,
            rounds,
            updateTeamRating,
            updateRound,
            fetchTeams,
            fetchRounds,
            setOldRatings,
            setUpdatedRatings
          );
          setStatus("Update completed.");
        } else {
          setStatus("No update needed.");
        }
        calculationDoneRef.current = true;
      } else {
        setStatus(
          "Preconditions for running update not met (teams/rounds/loading).\nMake sure teams and rounds are loaded."
        );
      }
    } catch (err) {
      setStatus(`Update failed: ${err.message}`);
    }
  };

  const handleClear = () => {
    setStatus(null);
    calculationDoneRef.current = false;
    setOldRatings([]);
    setUpdatedRatings([]);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Update Team Rating</h2>
      <p className="mb-4 text-sm text-gray-300">
        Click the button below to calculate and update team ratings for rounds not yet applied. Before doing this, make sure
        that you first correctly updated rounds in rounds tab.
      </p>

      <div className="flex gap-3">
        <button
          onClick={handleUpdate}
          disabled={loadingTeams || loadingRounds}
          className="px-4 py-2 rounded bg-orange-400 text-white hover:bg-orange-500 disabled:opacity-60"
        >
          Run update now
        </button>
        <button onClick={handleClear} className="px-4 py-2 rounded bg-gray-700 text-gray-200 hover:bg-gray-600">
          Clear
        </button>
      </div>

      {status && <pre className="mt-4 p-3 bg-gray-800 text-gray-100 rounded whitespace-pre-wrap">{status}</pre>}

      {errorTeams && <ErrorBox error={errorTeams} />}
      {errorRounds && <ErrorBox error={errorRounds} />}
    </div>
  );
};

export default UpdateTeamRatingPage;
