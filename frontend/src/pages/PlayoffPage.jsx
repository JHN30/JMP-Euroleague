import InfoCardGrid from "../components/common/InfoCardGrid";
import PageIntro from "../components/common/PageIntro";
import RelatedPageLinks from "../components/common/RelatedPageLinks";
import PlayoffBracket from "../components/playoff/PlayoffBracket";
import LayoutShell from "../components/layout/LayoutShell";

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

const playoffInfoCards = [
  {
    eyebrow: "Scenario planning",
    title: "How the Playoff Picture Is Framed",
    description:
      "The bracket starts from the current EuroLeague seed order, then lets every play-in and playoff result flow into the next round. That makes it easier to compare paths instead of only reading the standings as a static list.",
  },
  {
    eyebrow: "Rating context",
    title: "Connecting Seeds to Team Strength",
    description:
      "Seeding explains who plays whom, while JMP Rating helps compare the teams inside those paths. Pairing the playoff simulator with team ratings and matchup predictions gives each scenario more context.",
  },
];

const PlayoffPage = () => {
  return (
    <LayoutShell>
      <div className="flex flex-col gap-6 text-white pt-4">
        <PageIntro
          eyebrow="JMP Playoffs"
          title="EuroLeague Playoff Scenarios & Bracket Simulator"
          description="Explore play-in paths, quarterfinal matchups, semifinal routes, and championship scenarios from the current standings order."
        />

        <PlayoffBracket />

        <InfoCardGrid cards={playoffInfoCards} />

        <RelatedPageLinks links={playoffLinks} ariaLabel="Related playoff pages" />
      </div>
    </LayoutShell>
  );
};

export default PlayoffPage;
