import TeamUpdatesTableSkeleton from "../../skeletons/TeamUpdatesTableSkeleton";
import { formatPercentage, formatRoundLabel } from "../model/modelPerformanceUtils";
import TeamUpdatesTable from "./TeamUpdatesTable";
import { getRoundTone } from "./roundPerformanceGridUtils";

const RoundPerformancePanel = ({
  selectedRound,
  selectedMatchups,
  hasSelectedRoundDetails,
  isSelectedRoundDetailLoading,
  selectedRoundDetailError,
}) => {
  if (!selectedRound) {
    return null;
  }

  const selectedRoundTone = getRoundTone(selectedRound);

  return (
    <div
      id="round-performance-panel"
      className="rounded-2xl border border-orange-300/20 bg-slate-900/40 px-4 py-4 sm:px-5 sm:py-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-white">{formatRoundLabel(selectedRound.roundNumber)}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {selectedRound.correct} of {selectedRound.totalPredictions} game predictions were correct in this round.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-slate-400">Success Rate</p>
          <p className={`mt-2 text-4xl font-black leading-none ${selectedRoundTone.value}`}>
            {formatPercentage(selectedRound.successRate)}
          </p>
        </div>
      </div>

      {hasSelectedRoundDetails ? <TeamUpdatesTable matchups={selectedMatchups} /> : null}

      {isSelectedRoundDetailLoading ? <TeamUpdatesTableSkeleton /> : null}

      {selectedRoundDetailError && !isSelectedRoundDetailLoading ? (
        <div className="mt-5 rounded-2xl border border-rose-300/20 bg-rose-950/20 px-4 py-5 text-sm text-rose-100">
          {selectedRoundDetailError}
        </div>
      ) : null}
    </div>
  );
};

export default RoundPerformancePanel;
