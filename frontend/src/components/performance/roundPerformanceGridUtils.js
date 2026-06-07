export const getRoundTone = (round) => {
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
