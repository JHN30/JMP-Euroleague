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
      <div className="flex h-64 items-center justify-center">
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
    <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <h2 className="text-2xl font-semibold text-white">Update Rounds</h2>
      <p className="mt-2 text-sm text-gray-300">
        Use these controls to update the <code>latestRound</code> values.
      </p>

      {status && <pre className="mt-4 rounded-xl border border-white/10 bg-slate-900 p-3 text-gray-100 whitespace-pre-wrap">{status}</pre>}
      {errorRounds && <ErrorBox error={errorRounds} />}

      <div className="mt-4 space-y-4">
        {rounds && rounds.data && rounds.data.length > 0 ? (
          rounds.data.map((round) => {
            const roundId = round._id || round.id;
            return (
              <div key={roundId} className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-900/70 p-3">
                <div className="flex-1">
                  <div className="text-sm text-gray-300">Current: {round.currentRound}</div>
                  <div className="text-sm text-gray-300">Latest: {round.latestRound}</div>
                </div>

                <input
                  type="number"
                  id="latest-round"
                  value={inputs[roundId] ?? round.latestRound}
                  onChange={(e) => handleInputChange(roundId, e.target.value)}
                  className="w-28 rounded border border-white/10 bg-gray-800 px-2 py-1 text-white"
                />

                <button
                  onClick={() => handleUpdateRound(round)}
                  disabled={loadingRounds}
                  className="rounded border border-emerald-300/50 bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-100 hover:border-emerald-300/70 hover:bg-emerald-500/30 disabled:opacity-60"
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
