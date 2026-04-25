import { useEffect, useMemo, useRef, useState } from "react";

import { layoutCardClass } from "../layout/LayoutShell";
import { formatPercentage, formatRoundLabel, formatSignedPoints } from "./modelPerformanceUtils";

const getRoundTone = (round) => {
  if (!round?.totalPredictions) {
    return {
      value: "text-slate-100",
      label: "text-slate-400",
    };
  }

  if (round.successRate >= 70) {
    return {
      value: "text-emerald-100",
      label: "text-emerald-200/75",
    };
  }

  if (round.successRate >= 55) {
    return {
      value: "text-orange-100",
      label: "text-orange-200/75",
    };
  }

  return {
    value: "text-rose-100",
    label: "text-rose-200/75",
  };
};

const getCorrectShare = (round) => {
  if (!round?.totalPredictions) {
    return 0;
  }

  return (round.correct / round.totalPredictions) * 100;
};

const formatProbability = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0.0%";
  }

  return formatPercentage(numericValue <= 1 ? numericValue * 100 : numericValue);
};

const formatRating = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "-";
  }

  return numericValue.toLocaleString("en-US", {
    maximumFractionDigits: 1,
  });
};

const getRatingDeltaTone = (value) => {
  const numericValue = Number(value);

  if (numericValue > 0) {
    return "text-emerald-200";
  }

  if (numericValue < 0) {
    return "text-rose-200";
  }

  return "text-slate-300";
};

const ResultBadge = ({ isCorrect, label = isCorrect ? "Correct" : "Incorrect" }) => (
  <span
    className={`inline-flex items-center justify-center rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold ${
      isCorrect
        ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-100"
        : "border-rose-300/25 bg-rose-400/10 text-rose-100"
    }`}
  >
    {label}
  </span>
);

const RoundStripItem = ({ round, isSelected, onSelect, setItemRef, suppressClickRef }) => {
  const tone = getRoundTone(round);
  const correctShare = getCorrectShare(round);
  const wrongShare = round.totalPredictions > 0 ? Math.max(0, 100 - correctShare) : 0;

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
      </div>

      <p className={`mt-3 text-2xl font-semibold leading-none ${tone.value}`}>{formatPercentage(round.successRate)}</p>
      <p className="mt-2 text-sm font-medium text-slate-300">
        {round.correct}-{round.wrong}
      </p>

      <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <span className="h-full bg-emerald-400" style={{ width: `${correctShare}%` }} />
        <span className="h-full bg-rose-400/85" style={{ width: `${wrongShare}%` }} />
      </div>
    </button>
  );
};

const EloRatingCell = ({ update }) => (
  <div className="min-w-[150px]">
    <p className="font-medium text-white">{update?.team ?? "-"}</p>
    <p className="mt-1 text-xs text-slate-400">
      {formatRating(update?.preRoundRating)} to {formatRating(update?.postRoundRating)}
    </p>
    <p className={`mt-1 text-sm font-semibold ${getRatingDeltaTone(update?.ratingDelta)}`}>
      {formatSignedPoints(update?.ratingDelta)}
    </p>
  </div>
);

const TeamUpdatesTable = ({ matchups = [] }) => {
  if (matchups.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 w-full min-w-0 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-4">
      <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">Team Elo Updates</p>
          <p className="mt-1 text-sm text-slate-400">
            One row per game with both teams' rating movement and prediction result.
          </p>
        </div>

        <p className="shrink-0 text-sm font-medium text-slate-300 sm:text-right">{matchups.length} games</p>
      </div>

      <div className="mt-4 w-full overflow-x-auto">
        <table className="w-full min-w-[1040px] text-left text-sm">
          <thead className="border-b border-white/10 text-[0.68rem] font-semibold text-slate-400">
            <tr>
              <th className="px-3 py-2">Matchup</th>
              <th className="px-3 py-2">Pick</th>
              <th className="px-3 py-2">Winner</th>
              <th className="px-3 py-2">Home Win</th>
              <th className="px-3 py-2">Away Win</th>
              <th className="px-3 py-2">Home Elo</th>
              <th className="px-3 py-2">Away Elo</th>
              <th className="px-3 py-2">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-200">
            {matchups.map((matchup) => (
              <tr key={matchup.id} className="transition hover:bg-white/[0.03]">
                <td className="px-3 py-3">
                  <p className="font-medium text-white">{matchup.homeTeam}</p>
                  <p className="mt-1 text-xs text-slate-400">vs {matchup.awayTeam}</p>
                </td>
                <td className="px-3 py-3">
                  <p className="font-medium text-white">{matchup.predictedWinner || "-"}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {formatProbability(matchup.predictedWinnerProbability)}
                  </p>
                </td>
                <td className="px-3 py-3 font-medium text-white">{matchup.actualWinner || "-"}</td>
                <td className="px-3 py-3">{formatProbability(matchup.homeWinProbability)}</td>
                <td className="px-3 py-3">{formatProbability(matchup.awayWinProbability)}</td>
                <td className="px-3 py-3">
                  <EloRatingCell update={matchup.home} />
                </td>
                <td className="px-3 py-3">
                  <EloRatingCell update={matchup.away} />
                </td>
                <td className="px-3 py-3">
                  <ResultBadge isCorrect={matchup.isCorrect} label={matchup.predictionResult} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RoundPerformanceGrid = ({ rounds = [] }) => {
  const orderedRounds = useMemo(
    () => rounds.slice().sort((firstRound, secondRound) => firstRound.roundNumber - secondRound.roundNumber),
    [rounds]
  );
  const latestRoundNumber = orderedRounds.length > 0 ? orderedRounds[orderedRounds.length - 1].roundNumber : null;
  const [preferredRoundNumber, setPreferredRoundNumber] = useState(null);
  const [isDraggingStrip, setIsDraggingStrip] = useState(false);
  const stripContainerRef = useRef(null);
  const stripItemRefs = useRef(new Map());
  const hasScrolledStripRef = useRef(false);
  const suppressClickRef = useRef(false);
  const dragStateRef = useRef({
    startX: 0,
    startScrollLeft: 0,
    pointerDown: false,
  });
  const selectedRoundNumber = orderedRounds.some((round) => round.roundNumber === preferredRoundNumber)
    ? preferredRoundNumber
    : latestRoundNumber;

  useEffect(() => {
    if (!selectedRoundNumber) {
      return;
    }

    const selectedNode = stripItemRefs.current.get(selectedRoundNumber);
    const stripNode = stripContainerRef.current;

    if (selectedNode && stripNode) {
      const targetScrollLeft = selectedNode.offsetLeft - (stripNode.clientWidth - selectedNode.clientWidth) / 2;
      const maxScrollLeft = Math.max(0, stripNode.scrollWidth - stripNode.clientWidth);
      const nextScrollLeft = Math.min(Math.max(0, targetScrollLeft), maxScrollLeft);

      stripNode.scrollTo({
        left: nextScrollLeft,
        behavior: hasScrolledStripRef.current ? "smooth" : "auto",
      });
      hasScrolledStripRef.current = true;
    }
  }, [selectedRoundNumber]);

  useEffect(() => {
    if (!isDraggingStrip) {
      return undefined;
    }

    const handleMouseMove = (event) => {
      const stripNode = stripContainerRef.current;
      const dragState = dragStateRef.current;

      if (!stripNode || !dragState.pointerDown) {
        return;
      }

      const deltaX = event.clientX - dragState.startX;

      if (Math.abs(deltaX) > 4) {
        suppressClickRef.current = true;
      }

      stripNode.scrollLeft = dragState.startScrollLeft - deltaX;
    };

    const handleMouseUp = () => {
      dragStateRef.current.pointerDown = false;
      setIsDraggingStrip(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingStrip]);

  const selectedRound =
    orderedRounds.find((round) => round.roundNumber === selectedRoundNumber) ??
    (orderedRounds.length > 0 ? orderedRounds[orderedRounds.length - 1] : null);

  const selectedRoundCorrectShare = selectedRound ? getCorrectShare(selectedRound) : 0;
  const selectedRoundWrongShare =
    selectedRound && selectedRound.totalPredictions > 0 ? Math.max(0, 100 - selectedRoundCorrectShare) : 0;
  const selectedRoundTone = getRoundTone(selectedRound);
  const selectedMatchups = selectedRound?.matchups ?? [];
  const hasSelectedRoundDetails = selectedMatchups.length > 0;

  const setItemRef = (roundNumber, node) => {
    if (node) {
      stripItemRefs.current.set(roundNumber, node);
      return;
    }

    stripItemRefs.current.delete(roundNumber);
  };

  const handleStripMouseDown = (event) => {
    if (event.button !== 0) {
      return;
    }

    const stripNode = stripContainerRef.current;

    if (!stripNode) {
      return;
    }

    dragStateRef.current = {
      startX: event.clientX,
      startScrollLeft: stripNode.scrollLeft,
      pointerDown: true,
    };
    setIsDraggingStrip(true);
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

        <div
          ref={stripContainerRef}
          onMouseDown={handleStripMouseDown}
          className={`-mx-1 overflow-x-auto px-1 pb-2 touch-pan-x select-none ${
            isDraggingStrip ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <div className="flex min-w-max gap-3 snap-x snap-mandatory">
            {orderedRounds.map((round) => (
              <RoundStripItem
                key={round.roundNumber}
                round={round}
                isSelected={round.roundNumber === selectedRound?.roundNumber}
                onSelect={setPreferredRoundNumber}
                setItemRef={setItemRef}
                suppressClickRef={suppressClickRef}
              />
            ))}
          </div>
        </div>

        {selectedRound ? (
          <div
            id="round-performance-panel"
            className="rounded-2xl border border-orange-300/20 bg-slate-900/40 px-4 py-4 sm:px-5 sm:py-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {formatRoundLabel(selectedRound.roundNumber)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {selectedRound.correct} of {selectedRound.totalPredictions} game predictions were correct in this
                  round.
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
                    Prediction Distribution
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    Correct game predictions are shown first, then missed predictions.
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
            </div>

            {hasSelectedRoundDetails ? <TeamUpdatesTable matchups={selectedMatchups} /> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default RoundPerformanceGrid;
