import PredictingTeams from "../components/predictor/PredictingTeams";
import PageShell from "../components/layout/PageShell";

const PredictorPage = () => {
  return (
    <PageShell>
      <div className="flex flex-col gap-8 text-white">
        <header className="flex flex-col items-center text-center gap-2">
          <p className="text-sm uppercase tracking-[0.4em] text-orange-300/80">JMP Predictor</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-white">Simulate Any Euroleague Matchup</h1>
          <p className="text-base text-gray-300 max-w-2xl">
            Pick two teams, adjust injury impact, and let the JMP rating model project the most likely winner.
          </p>
        </header>

        <PredictingTeams />
      </div>
    </PageShell>
  );
};

export default PredictorPage;
