import { getRoundTone } from "./roundPerformanceGridUtils";

const RoundStripItem = ({ round, isSelected, onSelect, setItemRef, suppressClickRef }) => {
  const tone = getRoundTone(round);

  return (
    <button
      ref={(node) => setItemRef(round.roundNumber, node)}
      type="button"
      onClick={() => {
        if (suppressClickRef.current) {
          suppressClickRef.current = false;
          return;
        }

        onSelect(round.roundNumber);
      }}
      aria-pressed={isSelected}
      aria-controls="round-performance-panel"
      className={`w-20 shrink-0 snap-start rounded-2xl border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/60 ${
        isSelected
          ? "border-orange-300/30 bg-slate-950/80 shadow-lg shadow-orange-950/15"
          : "border-white/10 bg-slate-900/40 hover:border-white/20 hover:bg-slate-900/55"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-[0.75rem] font-semibold uppercase tracking-[0.2em] ${
            isSelected ? "text-orange-200/85" : "text-slate-400"
          }`}
        >
          R{round.roundNumber}
        </span>
      </div>

      <p className={`mt-2 text-2xl font-semibold leading-none ${tone.value}`}>
        {round.correct}-{round.wrong}
      </p>
    </button>
  );
};

const RoundPerformanceStrip = ({
  rounds,
  selectedRoundNumber,
  stripContainerRef,
  isDraggingStrip,
  onMouseDown,
  onSelectRound,
  setItemRef,
  suppressClickRef,
}) => (
  <div
    ref={stripContainerRef}
    onMouseDown={onMouseDown}
    className={`-mx-1 overflow-x-auto px-1 pb-2 touch-pan-x select-none ${
      isDraggingStrip ? "cursor-grabbing" : "cursor-grab"
    }`}
  >
    <div className="flex min-w-max gap-3 snap-x snap-mandatory">
      {rounds.map((round) => (
        <RoundStripItem
          key={round.roundNumber}
          round={round}
          isSelected={round.roundNumber === selectedRoundNumber}
          onSelect={onSelectRound}
          setItemRef={setItemRef}
          suppressClickRef={suppressClickRef}
        />
      ))}
    </div>
  </div>
);

export default RoundPerformanceStrip;
