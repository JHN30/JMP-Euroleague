import PageIntro from "../components/common/PageIntro";
import RelatedPageLinks from "../components/common/RelatedPageLinks";
import LayoutShell, { layoutCardClass } from "../components/layout/LayoutShell";

const relatedLinks = [
  {
    to: "/predictor",
    label: "Try the EuroLeague match predictor",
    description: "Compare two teams and see the current JMP win probability split.",
  },
  {
    to: "/model-performance",
    label: "Review model performance",
    description: "Track prediction accuracy, round results, and season-level performance trends.",
  },
  {
    to: "/teams",
    label: "Compare EuroLeague team ratings",
    description: "Open every club profile from the team directory and inspect its current rating context.",
  },
];

const AboutJmpRatingPage = () => {
  return (
    <LayoutShell contentClassName="max-w-6xl">
      <article className="flex flex-col gap-6 pt-4 text-white">
        <PageIntro
          eyebrow="JMP Rating"
          title="EuroLeague Prediction Model Explained"
          description="JMP Rating is the team-strength number behind JMP Euroleague. It gives each club a compact rating that can be compared with standings, scoring margin, recent form, and prediction results."
          gapClassName="gap-3"
        />

        <section className={`${layoutCardClass} overflow-hidden`}>
          <div className="grid gap-6 px-5 py-5 sm:px-6 sm:py-6 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-300/90">Purpose</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-100">What JMP Rating Measures</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                The goal of JMP Rating is to summarize EuroLeague team strength in one readable number. A win-loss
                record matters, but it does not always explain how strong a team is, how efficiently it has played,
                or whether its position is being helped by schedule context. JMP Euroleague keeps the rating beside
                the table so records and underlying strength can be read together.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-300/90">Signals</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-100">What Feeds the Model</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                The public app uses each team&apos;s current rating, round-by-round form, points scored, points allowed,
                and average scoring margin when building matchup probabilities. The project README also points to the
                wider JMP Rating system, which centers on player efficiency, recency weighting, and team-strength
                aggregation.
              </p>
            </div>
          </div>
        </section>

        <section className={`${layoutCardClass} overflow-hidden`}>
          <div className="grid gap-6 px-5 py-5 sm:px-6 sm:py-6 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-300/90">Prediction</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-100">How Match Probabilities Are Built</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                The predictor compares the selected home and away teams, evaluates the rating gap, and blends that
                with each team&apos;s scoring margin before the current round. The result is a pair of win probabilities,
                not a guaranteed pick. A team with the higher probability is simply the model&apos;s stronger side for
                that matchup at that moment.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-300/90">Accountability</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-100">How Accuracy Is Tracked</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                The model performance page records total predictions, correct picks, wrong picks, success rate, and
                round-level detail. That makes the rating system easier to judge over time because the site does not
                only show future predictions; it also keeps a running view of how those predictions performed.
              </p>
            </div>
          </div>
        </section>

        <section className={`${layoutCardClass} overflow-hidden`}>
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-300/90">Limits</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">How To Read the Rating</h2>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
              JMP Rating is best treated as a structured estimate of team strength, not a final answer. Basketball
              games can turn on shooting variance, roster availability, travel context, and late information that may
              sit outside the current rating view. Ratings also update after rounds are completed, so the number is a
              season-long signal that changes as new results arrive.
            </p>
          </div>
        </section>

        <RelatedPageLinks links={relatedLinks} ariaLabel="Related JMP Euroleague pages" />
      </article>
    </LayoutShell>
  );
};

export default AboutJmpRatingPage;
