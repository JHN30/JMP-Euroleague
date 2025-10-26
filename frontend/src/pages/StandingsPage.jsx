import StandingTeams from "../components/standings/StandingTeams";
import PageShell from "../components/layout/PageShell";

const StandingsPage = () => {
  return (
    <PageShell>
      <div className="flex flex-col gap-8 text-white">
        <header className="flex flex-col gap-2 justify-center items-center">
          <p className="text-sm uppercase tracking-[0.4em] text-orange-300/80">JMP Standings</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-white">Euroleague Table</h1>
        </header>

        <StandingTeams />
      </div>
    </PageShell>
  );
};

export default StandingsPage;
