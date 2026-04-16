import { useMemo } from "react";

import { layoutCardClass } from "../layout/LayoutShell";

const normalizeFormResults = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results.map((result) => (String(result).toUpperCase() === "W" ? "W" : "L"));
};

const getFormRecord = (results, sampleSize) => {
  const slice = results.slice(-sampleSize);
  const wins = slice.filter((result) => result === "W").length;

  return {
    wins,
    losses: slice.length - wins,
    sampleSize: slice.length,
  };
};

const getCurrentStreak = (results) => {
  if (results.length === 0) {
    return {
      value: "-",
      tone: "neutral",
    };
  }

  const latestResult = results[results.length - 1];
  let streakLength = 0;

  for (let index = results.length - 1; index >= 0; index -= 1) {
    if (results[index] !== latestResult) {
      break;
    }

    streakLength += 1;
  }

  return latestResult === "W"
    ? {
        value: `W${streakLength}`,
        tone: "positive",
      }
    : {
        value: `L${streakLength}`,
        tone: "negative",
      };
};

const getRecordTone = ({ wins, losses }) => {
  if (wins > losses) {
    return "positive";
  }

  if (losses > wins) {
    return "negative";
  }

  return "neutral";
};

const getInsightToneClasses = (tone) => {
  if (tone === "positive") {
    return {
      border: "border-emerald-400/25 bg-emerald-500/10",
      value: "text-emerald-200",
    };
  }

  if (tone === "negative") {
    return {
      border: "border-rose-400/25 bg-rose-500/10",
      value: "text-rose-200",
    };
  }

  return {
    border: "border-white/10 bg-white/[0.04]",
    value: "text-white",
  };
};

const FormInsightCard = ({ label, value, tone = "neutral" }) => {
  const toneClasses = getInsightToneClasses(tone);

  return (
    <div className={`rounded-xl border px-4 py-3 ${toneClasses.border}`}>
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-400">{label}</p>
      <p className={`mt-2 text-2xl font-semibold leading-none sm:text-[1.75rem] ${toneClasses.value}`}>{value}</p>
    </div>
  );
};

const TeamFormSummaryCard = ({ form = [] }) => {
  const summaryItems = useMemo(() => {
    const normalizedResults = normalizeFormResults(form);
    const lastFiveRecord = getFormRecord(normalizedResults, 5);
    const lastTenRecord = getFormRecord(normalizedResults, 10);
    const streak = getCurrentStreak(normalizedResults);

    return [
      {
        label: "Last 5",
        value: lastFiveRecord.sampleSize > 0 ? `${lastFiveRecord.wins}-${lastFiveRecord.losses}` : "-",
        tone: getRecordTone(lastFiveRecord),
      },
      {
        label: "Last 10",
        value: lastTenRecord.sampleSize > 0 ? `${lastTenRecord.wins}-${lastTenRecord.losses}` : "-",
        tone: getRecordTone(lastTenRecord),
      },
      {
        label: "Current Streak",
        value: streak.value,
        tone: streak.tone,
      },
    ];
  }, [form]);

  return (
    <section className={`${layoutCardClass} overflow-hidden`}>
      <div className="flex flex-col gap-4 px-4 py-3.5 sm:px-6 sm:py-5">
        <div className="border-b border-white/10 pb-3.5">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Recent Form</h2>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-3">
          {summaryItems.map((item) => (
            <FormInsightCard key={item.label} label={item.label} value={item.value} tone={item.tone} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamFormSummaryCard;
