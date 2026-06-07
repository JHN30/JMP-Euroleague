import InfoCardGrid from "../components/common/InfoCardGrid";
import PageIntro from "../components/common/PageIntro";
import RelatedPageLinks from "../components/common/RelatedPageLinks";
import PredictingTeams from "../components/predictor/PredictingTeams";
import LayoutShell from "../components/layout/LayoutShell";

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

const predictorInfoCards = [
  {
    eyebrow: "Prediction inputs",
    title: "What the Match Predictor Compares",
    description:
      "JMP Euroleague compares the selected home and away teams through current rating strength and scoring margin before the current round. The result is a probability split for that matchup, designed as a model read rather than a certainty.",
  },
  {
    eyebrow: "Model context",
    title: "Where Predictions Connect",
    description:
      "The same team-strength view appears across the standings, team pages, and playoff simulator. That keeps predictions tied to the public rating table instead of treating each game as an isolated forecast.",
  },
];

const PredictorPage = () => {
  return (
    <LayoutShell>
      <div className="flex flex-col gap-6 text-white pt-4">
        <PageIntro
          eyebrow="JMP Predictor"
          title="EuroLeague Predictions with JMP Rating"
          description="Estimate matchup win probabilities from current team rating, scoring margin, and home-away context."
        />

        <PredictingTeams />

        <InfoCardGrid cards={predictorInfoCards} />

        <RelatedPageLinks links={predictorLinks} ariaLabel="Related prediction pages" />
      </div>
    </LayoutShell>
  );
};

export default PredictorPage;
