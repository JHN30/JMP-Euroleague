import { layoutCardClass } from "../layout/LayoutShell";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const MatchSetupSection = ({ children, onCalculate, isCalculateDisabled }) => {
  return (
    <motion.section
      className={`${layoutCardClass} overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6 px-6 py-6">
        {children}
        <button
          className="inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-4 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition duration-200 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          onClick={onCalculate}
          disabled={isCalculateDisabled}
        >
          Calculate prediction
        </button>
      </div>
    </motion.section>
  );
};

export default MatchSetupSection;
