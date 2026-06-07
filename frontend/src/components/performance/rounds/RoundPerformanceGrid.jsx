import { layoutCardClass } from "../../layout/LayoutShell";
import RoundPerformancePanel from "./RoundPerformancePanel";
import RoundPerformanceStrip from "./RoundPerformanceStrip";
import { useRoundPerformanceSelection } from "./useRoundPerformanceSelection";

const EmptyRoundPerformance = () => (
  <section className={`${layoutCardClass} overflow-hidden`}>
    <div className="flex min-h-40 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-8 text-center text-sm text-slate-300">
      No round performance samples are available yet.
    </div>
  </section>
);

const RoundPerformanceHeader = () => (
  <div className="border-b border-white/10 pb-4">
    <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Round-by-Round Breakdown</h2>
        <p className="mt-2 text-sm text-slate-300">Select a round to inspect the result.</p>
      </div>
    </div>
  </div>
);

const RoundPerformanceGrid = ({
  rounds = [],
  loadingRoundDetailsByRound = {},
  errorRoundDetailsByRound = {},
  fetchRoundDetail,
}) => {
  const {
    orderedRounds,
    selectedRound,
    selectedRoundNumber,
    selectedMatchups,
    hasSelectedRoundDetails,
    isSelectedRoundDetailLoading,
    selectedRoundDetailError,
    stripContainerRef,
    isDraggingStrip,
    suppressClickRef,
    setItemRef,
    handleStripMouseDown,
    handleRoundSelect,
  } = useRoundPerformanceSelection({
    rounds,
    loadingRoundDetailsByRound,
    errorRoundDetailsByRound,
    fetchRoundDetail,
  });

  if (orderedRounds.length === 0) {
    return <EmptyRoundPerformance />;
  }

  return (
    <section className={`${layoutCardClass} overflow-hidden`}>
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-5 sm:py-5">
        <RoundPerformanceHeader />

        <RoundPerformanceStrip
          rounds={orderedRounds}
          selectedRoundNumber={selectedRoundNumber}
          stripContainerRef={stripContainerRef}
          isDraggingStrip={isDraggingStrip}
          onMouseDown={handleStripMouseDown}
          onSelectRound={handleRoundSelect}
          setItemRef={setItemRef}
          suppressClickRef={suppressClickRef}
        />

        <RoundPerformancePanel
          selectedRound={selectedRound}
          selectedMatchups={selectedMatchups}
          hasSelectedRoundDetails={hasSelectedRoundDetails}
          isSelectedRoundDetailLoading={isSelectedRoundDetailLoading}
          selectedRoundDetailError={selectedRoundDetailError}
        />
      </div>
    </section>
  );
};

export default RoundPerformanceGrid;
