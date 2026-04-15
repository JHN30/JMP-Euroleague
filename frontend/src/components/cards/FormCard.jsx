const FormCard = ({ value, gridColumns, className = "" }) => {
  const arr = Array.isArray(value) ? value : [];
  const normalizedCount =
    Number.isFinite(Number(gridColumns)) && Number(gridColumns) > 0 ? Number(gridColumns) : arr.length;
  const start = Math.max(arr.length - normalizedCount, 0);
  const slice = arr.slice(start);

  return (
    <div className={`w-full rounded-2xl border border-white/10 bg-white/5 p-2 sm:p-4 ${className}`}>
      {arr.length === 0 ? (
        <span className="flex items-center justify-center text-sm text-slate-300">No recent results</span>
      ) : (
        <div
          className={`grid w-full gap-1 sm:gap-3 ${
            slice.length <= 5 ? "grid-cols-5" : "grid-cols-10 sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
          }`}
        >
          {slice.map((result, idx) => {
            const isWin = String(result).toUpperCase() === "W";
            return (
              <div
                key={`${result}-${idx}`}
                className={`flex h-auto sm:h-10 w-auto sm:w-full items-center justify-center rounded-lg border text-sm font-semibold ${
                  isWin
                    ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-200"
                    : "border-rose-400/50 bg-rose-500/10 text-rose-200"
                }`}
              >
                {isWin ? "W" : "L"}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FormCard;
