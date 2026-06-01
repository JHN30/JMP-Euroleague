import { Link } from "react-router-dom";

import PlayoffBracket from "../components/playoff/PlayoffBracket";
import LayoutShell, { layoutCardClass } from "../components/layout/LayoutShell";

const playoffLinks = [
  {
    to: "/",
    label: "Current EuroLeague standings",
    description: "Return to the table that seeds the playoff picture.",
  },
  {
    to: "/predictor",
    label: "EuroLeague matchup predictions",
    description: "Compare potential playoff matchups with JMP probabilities.",
  },
  {
    to: "/teams",
    label: "Team ratings directory",
    description: "Check each club before building a bracket path.",
  },
];

const PlayoffPage = () => {
  return (
    <LayoutShell>
      <div className="flex flex-col gap-6 text-white pt-4">
        <header className="flex flex-col gap-2 justify-center items-center text-center">
          <p className="text-sm uppercase tracking-wider text-orange-400/90 font-semibold">JMP Playoffs</p>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight text-slate-100 sm:text-4xl">
            EuroLeague Playoff Scenarios & Bracket Simulator
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            Explore play-in paths, quarterfinal matchups, semifinal routes, and championship scenarios from the
            current standings order.
          </p>
        </header>

        <PlayoffBracket />

        <section className="grid gap-4 lg:grid-cols-2">
          <div className={`${layoutCardClass} px-5 py-5 sm:px-6 sm:py-6`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-300/90">Scenario planning</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">How the Playoff Picture Is Framed</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              The bracket starts from the current EuroLeague seed order, then lets every play-in and playoff result
              flow into the next round. That makes it easier to compare paths instead of only reading the standings
              as a static list.
            </p>
          </div>

          <div className={`${layoutCardClass} px-5 py-5 sm:px-6 sm:py-6`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-300/90">Rating context</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">Connecting Seeds to Team Strength</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Seeding explains who plays whom, while JMP Rating helps compare the teams inside those paths. Pairing
              the playoff simulator with team ratings and matchup predictions gives each scenario more context.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3" aria-label="Related playoff pages">
          {playoffLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`${layoutCardClass} block px-5 py-5 transition hover:border-orange-300/30 hover:bg-slate-900`}
            >
              <h2 className="text-base font-semibold text-slate-100">{link.label}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{link.description}</p>
            </Link>
          ))}
        </section>
      </div>
    </LayoutShell>
  );
};

export default PlayoffPage;
