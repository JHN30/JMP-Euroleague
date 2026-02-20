import StandingTeams from "../components/standings/StandingTeams";
import LayoutShell from "../components/layout/LayoutShell";

const StandingsPage = () => {
  return (
    <LayoutShell>
      <div className="flex flex-col gap-6 text-white pt-4">
        <header className="flex flex-col gap-2 justify-center items-center">
          <p className="text-sm uppercase tracking-wider text-orange-400/90 font-semibold">JMP Standings</p>
          <h1 className="text-3xl font-bold leading-tight text-slate-100">Euroleague Table</h1>
        </header>

        <StandingTeams />
      </div>
    </LayoutShell>
  );
};

export default StandingsPage;
