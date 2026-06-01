import { Link } from "react-router-dom";

import PredictingTeams from "../components/predictor/PredictingTeams";
import LayoutShell, { layoutCardClass } from "../components/layout/LayoutShell";

const predictorLinks = [
  {
    to: "/about-jmp-rating",
    label: "How JMP Rating works",
    description: "Read how the model turns team strength into matchup probabilities.",
  },
  {
    to: "/model-performance",
    label: "Model accuracy tracker",
    description: "See how JMP predictions have performed round by round.",
  },
  {
    to: "/teams",
    label: "Compare team ratings",
    description: "Browse club profiles before selecting a matchup.",
  },
];

const PredictorPage = () => {
  return (
    <LayoutShell>
      <div className="flex flex-col gap-6 text-white pt-4">
        <header className="flex flex-col gap-2 justify-center items-center text-center">
          <p className="text-sm uppercase tracking-wider text-orange-400/90 font-semibold">JMP Predictor</p>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight text-slate-100 sm:text-4xl">
            EuroLeague Predictions with JMP Rating
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            Estimate matchup win probabilities from current team rating, scoring margin, and home-away context.
          </p>
        </header>

        <PredictingTeams />

        <section className="grid gap-4 lg:grid-cols-2">
          <div className={`${layoutCardClass} px-5 py-5 sm:px-6 sm:py-6`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-300/90">Prediction inputs</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">What the Match Predictor Compares</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              JMP Euroleague compares the selected home and away teams through current rating strength and scoring
              margin before the current round. The result is a probability split for that matchup, designed as a
              model read rather than a certainty.
            </p>
          </div>

          <div className={`${layoutCardClass} px-5 py-5 sm:px-6 sm:py-6`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-300/90">Model context</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">Where Predictions Connect</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              The same team-strength view appears across the standings, team pages, and playoff simulator. That keeps
              predictions tied to the public rating table instead of treating each game as an isolated forecast.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3" aria-label="Related prediction pages">
          {predictorLinks.map((link) => (
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

export default PredictorPage;
