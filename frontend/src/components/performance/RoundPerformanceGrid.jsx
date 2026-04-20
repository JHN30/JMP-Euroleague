import { useEffect, useMemo, useRef, useState } from "react";

import { layoutCardClass } from "../layout/LayoutShell";
import { formatPercentage, formatRoundLabel } from "./modelPerformanceUtils";

const detailToneMap = {
  positive: {
    card: "border-emerald-400/20 bg-slate-900/40",
    value: "text-emerald-100",
    detail: "text-emerald-200/80",
  },
  negative: {
    card: "border-rose-400/20 bg-slate-900/40",
    value: "text-rose-100",
    detail: "text-rose-200/80",
  },
};

const getRoundTone = (round) => {
  if (!round?.totalPredictions) {
    return {
      value: "text-slate-100",
      label: "text-slate-400",
      rateBar: "bg-slate-400/70",
    };
  }

  if (round.successRate >= 70) {
    return {
      value: "text-emerald-100",
      label: "text-emerald-200/75",
      rateBar: "bg-emerald-400",
    };
  }

  if (round.successRate >= 55) {
    return {
      value: "text-orange-100",
      label: "text-orange-200/75",
      rateBar: "bg-orange-400",
    };
  }

  return {
    value: "text-rose-100",
    label: "text-rose-200/75",
    rateBar: "bg-rose-400",
  };
};

const buildRoundSegments = (correct, totalPredictions) =>
  Array.from({ length: totalPredictions }, (_, index) => index < correct);

const getCorrectShare = (round) => {
  if (!round?.totalPredictions) {
    return 0;
  }

  return (round.correct / round.totalPredictions) * 100;
};

const DetailStatCard = ({ label, value, detail, tone = "positive" }) => {
  const toneClasses = detailToneMap[tone] ?? detailToneMap.positive;

  return (
    <div className={`rounded-2xl border px-4 py-4 ${toneClasses.card}`}>
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-400">{label}</p>
      <p className={`mt-2 text-3xl font-semibold ${toneClasses.value}`}>{value}</p>
      <p className={`mt-2 text-sm ${toneClasses.detail}`}>{detail}</p>
    </div>
  );
};

const RoundStripItem = ({ round, isSelected, onSelect, setItemRef }) => {
  const tone = getRoundTone(round);
  const correctShare = getCorrectShare(round);
  const wrongShare = round.totalPredictions > 0 ? Math.max(0, 100 - correctShare) : 0;

  return (
    <button
      ref={(node) => setItemRef(round.roundNumber, node)}
      type="button"
      onClick={() => onSelect(round.roundNumber)}
      aria-pressed={isSelected}
      aria-controls="round-performance-panel"
      className={`w-[110px] shrink-0 snap-start rounded-2xl border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/60 ${
        isSelected
          ? "border-orange-300/30 bg-slate-950/80 shadow-lg shadow-orange-950/15"
          : "border-white/10 bg-slate-900/40 hover:border-white/20 hover:bg-slate-900/55"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-[0.62rem] font-semibold uppercase tracking-[0.2em] ${
            isSelected ? "text-orange-200/85" : "text-slate-400"
          }`}
        >
          R{round.roundNumber}
        </span>

        <span
          className={`h-2 w-2 rounded-full ${
            isSelected ? "bg-orange-300" : "bg-white/10"
          }`}
          aria-hidden="true"
        />
      </div>

      <p className={`mt-3 text-2xl font-semibold leading-none ${tone.value}`}>{formatPercentage(round.successRate)}</p>
      <p className="mt-2 text-sm font-medium text-slate-300">
        {round.correct}-{round.wrong}
      </p>

      <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <span className="h-full bg-emerald-400" style={{ width: `${correctShare}%` }} />
        <span className="h-full bg-rose-400/85" style={{ width: `${wrongShare}%` }} />
      </div>

      <div className="mt-2 h-0.5 w-full rounded-full bg-white/5" aria-hidden="true">
        <div
          className={`h-full rounded-full ${tone.rateBar}`}
          style={{ width: `${round.totalPredictions > 0 ? Math.max(round.successRate, 6) : 0}%` }}
        />
      </div>
    </button>
  );
};

const RoundPerformanceGrid = ({ rounds = [] }) => {
  const orderedRounds = useMemo(
    () => rounds.slice().sort((firstRound, secondRound) => firstRound.roundNumber - secondRound.roundNumber),
    [rounds]
  );
  const latestRoundNumber = orderedRounds.length > 0 ? orderedRounds[orderedRounds.length - 1].roundNumber : null;
  const [selectedRoundNumber, setSelectedRoundNumber] = useState(latestRoundNumber);
  const stripItemRefs = useRef(new Map());

  useEffect(() => {
    if (orderedRounds.length === 0) {
      setSelectedRoundNumber(null);
      return;
    }

    setSelectedRoundNumber((currentRoundNumber) => {
      if (orderedRounds.some((round) => round.roundNumber === currentRoundNumber)) {
        return currentRoundNumber;
      }

      return latestRoundNumber;
    });
  }, [orderedRounds, latestRoundNumber]);

  useEffect(() => {
    if (!selectedRoundNumber) {
      return;
    }

    const selectedNode = stripItemRefs.current.get(selectedRoundNumber);

    if (selectedNode) {
      selectedNode.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedRoundNumber]);

  const selectedRound =
    orderedRounds.find((round) => round.roundNumber === selectedRoundNumber) ??
    (orderedRounds.length > 0 ? orderedRounds[orderedRounds.length - 1] : null);

  const selectedRoundSegments = selectedRound
    ? buildRoundSegments(selectedRound.correct, selectedRound.totalPredictions)
    : [];
  const selectedRoundCorrectShare = selectedRound ? getCorrectShare(selectedRound) : 0;
  const selectedRoundWrongShare =
    selectedRound && selectedRound.totalPredictions > 0 ? Math.max(0, 100 - selectedRoundCorrectShare) : 0;
  const selectedRoundTone = getRoundTone(selectedRound);

  const setItemRef = (roundNumber, node) => {
    if (node) {
      stripItemRefs.current.set(roundNumber, node);
      return;
    }

    stripItemRefs.current.delete(roundNumber);
  };

  if (orderedRounds.length === 0) {
    return (
      <section className={`${layoutCardClass} overflow-hidden`}>
        <div className="flex min-h-40 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-8 text-center text-sm text-slate-300">
          No round performance samples are available yet.
        </div>
      </section>
    );
  }

  return (
    <section className={`${layoutCardClass} overflow-hidden`}>
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-5 sm:py-5">
        <div className="border-b border-white/10 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300/80">Rounds</p>
          <div className="mt-2 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white sm:text-2xl">Round-by-Round Breakdown</h2>
              <p className="mt-2 text-sm text-slate-300">Select a round to inspect the result.</p>
            </div>

            <p className="text-sm text-slate-400">
              {orderedRounds.length} rounds tracked in chronological order
            </p>
          </div>
        </div>

        <div className="-mx-1 overflow-x-auto px-1 pb-2">
          <div className="flex min-w-max gap-3 snap-x snap-mandatory">
            {orderedRounds.map((round) => (
              <RoundStripItem
                key={round.roundNumber}
                round={round}
                isSelected={round.roundNumber === selectedRound?.roundNumber}
                onSelect={setSelectedRoundNumber}
                setItemRef={setItemRef}
              />
            ))}
          </div>
        </div>

        {selectedRound ? (
          <div
            id="round-performance-panel"
            className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]"
          >
            <div className="rounded-2xl border border-orange-300/20 bg-slate-900/40 px-4 py-4 sm:px-5 sm:py-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-orange-200/80">
                    Selected Round
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    {formatRoundLabel(selectedRound.roundNumber)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {selectedRound.correct} of {selectedRound.totalPredictions} picks were correct in this round.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Success Rate
                  </p>
                  <p className={`mt-2 text-4xl font-black leading-none ${selectedRoundTone.value}`}>
                    {formatPercentage(selectedRound.successRate)}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Pick Distribution
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      Correct picks are shown first, then missed picks.
                    </p>
                  </div>

                  <p className="text-sm font-medium text-slate-300">
                    {selectedRound.correct}-{selectedRound.wrong}
                  </p>
                </div>

                <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                  <span className="h-full bg-emerald-400" style={{ width: `${selectedRoundCorrectShare}%` }} />
                  <span className="h-full bg-rose-400/85" style={{ width: `${selectedRoundWrongShare}%` }} />
                </div>

                <div className="mt-4 flex gap-2" aria-hidden="true">
                  {selectedRoundSegments.map((isCorrect, index) => (
                    <span
                      key={`${selectedRound.roundNumber}-detail-segment-${index}`}
                      className={`h-3 flex-1 rounded-md ${isCorrect ? "bg-emerald-400" : "bg-rose-400/85"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <DetailStatCard
                label="Correct"
                value={selectedRound.correct}
                detail={`${formatPercentage(selectedRoundCorrectShare)} of picks were correct`}
                tone="positive"
              />

              <DetailStatCard
                label="Wrong"
                value={selectedRound.wrong}
                detail={`${formatPercentage(selectedRoundWrongShare)} of picks were missed`}
                tone="negative"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default RoundPerformanceGrid;
