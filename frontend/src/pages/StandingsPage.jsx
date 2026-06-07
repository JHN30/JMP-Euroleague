import InfoCardGrid from "../components/common/InfoCardGrid";
import PageIntro from "../components/common/PageIntro";
import RelatedPageLinks from "../components/common/RelatedPageLinks";
import StandingTeams from "../components/standings/StandingTeams";
import LayoutShell from "../components/layout/LayoutShell";

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

const standingsInfoCards = [
  {
    eyebrow: "Standings context",
    title: "What the EuroLeague Table Shows",
    description:
      "The table keeps the classic record view front and center, then adds scoring totals, point differential, form, and rating. That makes it easier to spot the difference between teams with similar records and teams that are trending in opposite directions.",
  },
  {
    eyebrow: "Rating context",
    title: "Why JMP Rating Sits Beside Record",
    description:
      "Win-loss record is useful, but it can hide how strongly a team has played. JMP Rating gives each club a single strength number that can be used across the standings, matchup predictor, team pages, and playoff scenarios.",
  },
];

const StandingsPage = () => {
  return (
    <LayoutShell>
      <div className="flex flex-col gap-6 text-white pt-4">
        <PageIntro
          eyebrow="JMP Standings"
          title="EuroLeague Standings, Predictions & Team Ratings"
          description="Track the EuroLeague table with wins, losses, scoring differential, recent form, and JMP Rating in one standings view."
          gapClassName="gap-3"
        />

        <StandingTeams />

        <InfoCardGrid cards={standingsInfoCards} />

        <RelatedPageLinks
          links={homepageLinks}
          ariaLabel="Explore JMP Euroleague tools"
          gridClassName="sm:grid-cols-2 xl:grid-cols-5"
          linkClassName="px-4 py-4"
          titleClassName="text-sm font-semibold text-slate-100"
          descriptionClassName="mt-2 text-xs leading-5 text-slate-300"
        />
      </div>
    </LayoutShell>
  );
};

export default StandingsPage;
