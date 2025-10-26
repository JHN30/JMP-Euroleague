import { motion } from "framer-motion";

import { pageCardClass } from "../layout/PageShell";

const MatchSetupSection = ({ children, onCalculate, isCalculateDisabled }) => {
  return (
    <motion.section
      className={`${pageCardClass} overflow-hidden`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="border-b border-white/5 px-6 py-6">
        <p className="text-xs uppercase tracking-[0.4em] text-orange-200">Match setup</p>
        <div className="mt-2 flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-white">Choose teams & tune your assumptions</h2>
          <p className="text-sm text-gray-300">Selections use live JMP ratings from the active season.</p>
        </div>
      </div>

      <div className="space-y-8 px-6 py-6">
        {children}
        <motion.button
          className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onCalculate}
          disabled={isCalculateDisabled}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          Calculate prediction
        </motion.button>
      </div>
    </motion.section>
  );
};

export default MatchSetupSection;
