import { memo, useMemo, useRef } from "react";

const ELLIPSIS_LEADING = "ellipsis-leading";
const ELLIPSIS_TRAILING = "ellipsis-trailing";

const buildRoundItems = (totalRounds, currentRound) => {
  if (totalRounds <= 0) {
    return [];
  }

  if (totalRounds <= 9) {
    return Array.from({ length: totalRounds }, (_, index) => index);
  }

  const firstRound = 0;
  const lastRound = totalRounds - 1;
  const windowStart = Math.max(currentRound - 2, 1);
  const windowEnd = Math.min(currentRound + 2, lastRound - 1);

  const items = [firstRound];

  if (windowStart > 1) {
    items.push(ELLIPSIS_LEADING);
  }

  for (let round = windowStart; round <= windowEnd; round += 1) {
    items.push(round);
  }

  if (windowEnd < lastRound - 1) {
    items.push(ELLIPSIS_TRAILING);
  }

  items.push(lastRound);

  return items;
};

const TeamUpdateRoundNavigation = ({
  totalRounds,
  currentRound,
  activeRoundLabel,
  onPrev,
  onNext,
  onSelectRound,
  PrevIcon,
  NextIcon,
}) => {
  const jumpInputRef = useRef(null);

  const isPrevDisabled = currentRound === 0;
  const isNextDisabled = currentRound === totalRounds - 1;
  const roundItems = useMemo(() => buildRoundItems(totalRounds, currentRound), [totalRounds, currentRound]);

  const handleJump = () => {
    if (!totalRounds) {
      return;
    }

    const inputValue = jumpInputRef.current?.value ?? "";
    const parsedRound = Number.parseInt(inputValue, 10);
    if (Number.isNaN(parsedRound)) {
      return;
    }

    const clampedRound = Math.min(Math.max(parsedRound, 1), totalRounds);
    if (jumpInputRef.current) {
      jumpInputRef.current.value = String(clampedRound);
    }
    onSelectRound(clampedRound - 1);
  };

  const handleJumpKeyDown = (event) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    handleJump();
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5 shadow-inner shadow-black/30">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-400/90">Active Round</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{activeRoundLabel}</h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPrev}
            disabled={isPrevDisabled}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
              isPrevDisabled
                ? "cursor-not-allowed border-white/10 text-gray-500"
                : "border-white/10 text-gray-100 hover:border-orange-400/50 hover:text-white"
            }`}
          >
            {PrevIcon ? <PrevIcon className="h-4 w-4" aria-hidden="true" /> : null}
            <span>Previous</span>
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={isNextDisabled}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
              isNextDisabled
                ? "cursor-not-allowed border-white/10 text-gray-500"
                : "border-white/10 text-gray-100 hover:border-orange-400/50 hover:text-white"
            }`}
          >
            <span>Next</span>
            {NextIcon ? <NextIcon className="h-4 w-4" aria-hidden="true" /> : null}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {roundItems.map((item, index) => {
          if (item === ELLIPSIS_LEADING || item === ELLIPSIS_TRAILING) {
            return (
              <span
                key={`${item}-${index}`}
                className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-400"
              >
                ...
              </span>
            );
          }

          const isActive = item === currentRound;
          return (
            <button
              key={`round-${item}`}
              type="button"
              onClick={() => onSelectRound(item)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border border-orange-400/70 bg-orange-500/20 text-orange-100"
                  : "border border-white/10 bg-white/10 text-gray-200 hover:border-orange-400/40 hover:text-white"
              }`}
            >
              Round {item + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <label htmlFor="jump-round" className="text-xs font-semibold uppercase tracking-wider text-gray-300">
          Jump to round
        </label>
        <input
          key={`jump-${currentRound}-${totalRounds}`}
          ref={jumpInputRef}
          id="jump-round"
          type="number"
          min={1}
          max={Math.max(totalRounds, 1)}
          defaultValue={totalRounds > 0 ? String(currentRound + 1) : ""}
          onKeyDown={handleJumpKeyDown}
          disabled={!totalRounds}
          className="w-24 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/40"
          placeholder="1"
        />
        <button
          type="button"
          onClick={handleJump}
          disabled={!totalRounds}
          className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
            totalRounds
              ? "border-orange-300/50 bg-orange-500/20 text-orange-100 hover:border-orange-300/70 hover:bg-orange-500/30"
              : "cursor-not-allowed border-white/10 bg-white/5 text-gray-500"
          }`}
        >
          Go
        </button>
      </div>
    </section>
  );
};

export default memo(TeamUpdateRoundNavigation);
