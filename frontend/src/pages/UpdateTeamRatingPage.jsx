import { useState, useRef, useEffect } from "react";
import { useTeam } from "../hooks/useTeam";
import { useRound } from "../hooks/useRound";
import { calculateAndUpdateRatings } from "../utils/ratingsCalculator";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorBox from "../components/errors/ErrorBox";
import { DEFAULT_SEASON } from "../constants/appConstants";

const UpdateTeamRatingPage = () => {
  const { fetchTeams, updateTeamRating, teams, loadingTeams, errorTeams } = useTeam();
  const { fetchRounds, updateRound, rounds, loadingRounds, errorRounds } = useRound();
  const [status, setStatus] = useState(null);
  const [oldRatings, setOldRatings] = useState([]);
  const [updatedRatings, setUpdatedRatings] = useState([]);
  const calculationDoneRef = useRef(false);

  useEffect(() => {
    fetchTeams(DEFAULT_SEASON);
    fetchRounds();
  }, [fetchTeams, fetchRounds]);

  if (loadingTeams || loadingRounds) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (errorTeams || errorRounds) {
    return <ErrorBox error={errorTeams || errorRounds} />;
  }

  const handleUpdate = async () => {
    try {
      if (
        !calculationDoneRef.current &&
        teams?.data?.length > 0 &&
        rounds?.data?.[0] &&
        !loadingTeams &&
        !loadingRounds
      ) {
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
    <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <h2 className="text-2xl font-semibold text-white">Update Team Rating</h2>
      <p className="mt-2 text-sm text-gray-300">
        Run this when you want to calculate and apply ratings for rounds not yet processed.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={handleUpdate}
          disabled={loadingTeams || loadingRounds}
          className="rounded-lg border border-orange-300/50 bg-orange-500/20 px-4 py-2 text-sm font-semibold text-orange-100 transition-colors hover:border-orange-300/70 hover:bg-orange-500/30 disabled:opacity-60"
        >
          Run update now
        </button>
        <button
          onClick={handleClear}
          className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-gray-200 transition-colors hover:border-white/20 hover:text-white"
        >
          Clear
        </button>
      </div>

      {status && <pre className="mt-4 rounded-xl border border-white/10 bg-slate-900 p-3 text-gray-100 whitespace-pre-wrap">{status}</pre>}
    </div>
  );
};

export default UpdateTeamRatingPage;
