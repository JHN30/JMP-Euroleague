import { Link } from "react-router-dom";

import StandingTeams from "../components/standings/StandingTeams";
import LayoutShell, { layoutCardClass } from "../components/layout/LayoutShell";

const homepageLinks = [
  {
    to: "/predictor",
    label: "EuroLeague predictions",
    description: "Compare any matchup with JMP Rating win probabilities.",
  },
  {
    to: "/playoff",
    label: "EuroLeague playoff scenarios",
    description: "Build bracket paths from the current standings picture.",
  },
  {
    to: "/teams",
    label: "EuroLeague team ratings",
    description: "Browse every club and open detailed rating profiles.",
  },
  {
    to: "/model-performance",
    label: "Prediction model performance",
    description: "Review round-by-round accuracy and season results.",
  },
  {
    to: "/about-jmp-rating",
    label: "About JMP Rating",
    description: "Learn what the rating measures and how the model reads matchups.",
  },
];

const StandingsPage = () => {
  return (
    <LayoutShell>
      <div className="flex flex-col gap-6 text-white pt-4">
        <header className="flex flex-col gap-3 justify-center items-center text-center">
          <p className="text-sm uppercase tracking-wider text-orange-400/90 font-semibold">JMP Standings</p>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight text-slate-100 sm:text-4xl">
            EuroLeague Standings, Predictions & Team Ratings
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            Track the EuroLeague table with wins, losses, scoring differential, recent form, and JMP Rating in one
            standings view.
          </p>
        </header>

        <StandingTeams />

        <section className="grid gap-4 lg:grid-cols-2">
          <div className={`${layoutCardClass} px-5 py-5 sm:px-6 sm:py-6`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-300/90">Standings context</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">What the EuroLeague Table Shows</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              The table keeps the classic record view front and center, then adds scoring totals, point differential,
              form, and rating. That makes it easier to spot the difference between teams with similar records and
              teams that are trending in opposite directions.
            </p>
          </div>

          <div className={`${layoutCardClass} px-5 py-5 sm:px-6 sm:py-6`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-300/90">Rating context</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">Why JMP Rating Sits Beside Record</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Win-loss record is useful, but it can hide how strongly a team has played. JMP Rating gives each club a
              single strength number that can be used across the standings, matchup predictor, team pages, and playoff
              scenarios.
            </p>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5" aria-label="Explore JMP Euroleague tools">
          {homepageLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`${layoutCardClass} block px-4 py-4 transition hover:border-orange-300/30 hover:bg-slate-900`}
            >
              <h2 className="text-sm font-semibold text-slate-100">{link.label}</h2>
              <p className="mt-2 text-xs leading-5 text-slate-300">{link.description}</p>
            </Link>
          ))}
        </section>
      </div>
    </LayoutShell>
  );
};

export default StandingsPage;
