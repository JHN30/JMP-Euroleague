import { layoutCardClass } from "../layout/LayoutShell";

const MatchSetupSection = ({ children, onCalculate, isCalculateDisabled }) => {
  return (
    <section className={`${layoutCardClass} overflow-hidden`}>
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
    </section>
  );
};

export default MatchSetupSection;
