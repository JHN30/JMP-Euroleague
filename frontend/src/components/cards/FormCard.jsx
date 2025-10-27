import { motion } from "framer-motion";

const FormCard = ({ value, gridColumns, className = "" }) => {
  const arr = Array.isArray(value) ? value : [];
  const normalizedCount =
    Number.isFinite(Number(gridColumns)) && Number(gridColumns) > 0 ? Number(gridColumns) : arr.length;
  const start = Math.max(arr.length - normalizedCount, 0);
  const slice = arr.slice(start);

  return (
    <motion.div
      className={`w-full rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-5 shadow-inner shadow-black/30 backdrop-blur ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {arr.length === 0 ? (
        <span className="flex items-center justify-center text-sm text-gray-300">No recent results</span>
      ) : (
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(3.25rem,1fr))] place-items-center gap-3 sm:grid-cols-[repeat(auto-fit,minmax(3.5rem,1fr))] sm:place-items-stretch sm:gap-4">
          {slice.map((result, idx) => {
            const isWin = String(result).toUpperCase() === "W";
            return (
              <div
                key={`${result}-${idx}`}
                className={`flex h-14 w-full items-center justify-center rounded-2xl border text-lg font-semibold transition-colors duration-200 sm:h-16 ${
                  isWin
                    ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-200"
                    : "border-rose-400/60 bg-rose-500/10 text-rose-200"
                }`}
              >
                {isWin ? "W" : "L"}
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default FormCard;
