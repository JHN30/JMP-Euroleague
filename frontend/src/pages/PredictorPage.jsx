import PredictingTeams from "../components/predictor/PredictingTeams";
import LayoutShell from "../components/layout/LayoutShell";

const PredictorPage = () => {
  return (
    <LayoutShell>
      <div className="flex flex-col gap-6 text-white pt-4">
        <header className="flex flex-col gap-2 justify-center items-center text-center">
          <p className="text-sm uppercase tracking-wider text-orange-400/90 font-semibold">JMP Predictor</p>
          <h1 className="text-3xl font-bold leading-tight text-slate-100">Simulate Any Euroleague Matchup</h1>
        </header>

        <PredictingTeams />
      </div>
    </LayoutShell>
  );
};

export default PredictorPage;
