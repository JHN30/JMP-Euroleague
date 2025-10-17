import { useEffect, useState } from "react";
import ErrorBox from "../components/errors/ErrorBox";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useRound } from "../hooks/useRound";

const UpdateRoundsPage = () => {
  const [status, setStatus] = useState(null);
  const [inputs, setInputs] = useState({});

  const { rounds, fetchRounds, updateRound, loadingRounds, errorRounds } = useRound();

  useEffect(() => {
    fetchRounds();
  }, [fetchRounds]);

  if (loadingRounds) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (errorRounds) {
    return <ErrorBox error={errorRounds} />;
  }

  const handleInputChange = (roundId, value) => {
    setInputs((s) => ({ ...s, [roundId]: value }));
  };

  const handleUpdateRound = async (round) => {
    const roundId = round._id;
    const raw = inputs[roundId];
    if (raw === undefined || raw === "") {
      setStatus("Please enter a latest round value before updating.");
      return;
    }

    const latestRound = Number(raw);
    if (Number.isNaN(latestRound)) {
      setStatus("latestRound must be a number");
      return;
    }

    try {
      setStatus(`Updating round ${roundId}...`);
      // Send both fields to avoid clobbering server-side currentRound logic
      await updateRound(roundId, { currentRound: round.currentRound, latestRound });
      // Inform AdminPage to re-fetch if a fetch function was provided
      if (typeof fetchRounds === "function") {
        await fetchRounds();
      }
      setStatus(`Round updated (${latestRound}).`);
    } catch (err) {
      setStatus(`Update failed: ${err.message}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Update Rounds</h2>
      <p className="mb-4 text-sm text-gray-300">
        Use these controls to update the <code>latestRound</code> values.
      </p>

      {status && <pre className="mt-2 p-3 bg-gray-800 text-gray-100 rounded whitespace-pre-wrap">{status}</pre>}
      {errorRounds && <ErrorBox error={errorRounds} />}

      <div className="mt-4 space-y-4">
        {rounds && rounds.data && rounds.data.length > 0 ? (
          rounds.data.map((round) => {
            const roundId = round._id || round.id;
            return (
              <div key={roundId} className="p-3 bg-gray-900 rounded flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-sm text-gray-300">Current: {round.currentRound}</div>
                  <div className="text-sm text-gray-300">Latest: {round.latestRound}</div>
                </div>

                <input
                  type="number"
                  value={inputs[roundId] ?? round.latestRound}
                  onChange={(e) => handleInputChange(roundId, e.target.value)}
                  className="w-28 px-2 py-1 rounded bg-gray-800 text-white"
                />

                <button
                  onClick={() => handleUpdateRound(round)}
                  disabled={loadingRounds}
                  className="px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-60"
                >
                  Save
                </button>
              </div>
            );
          })
        ) : (
          <div className="text-sm text-gray-400">No rounds found.</div>
        )}
      </div>
    </div>
  );
};

export default UpdateRoundsPage;
