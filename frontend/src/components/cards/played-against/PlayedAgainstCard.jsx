import { useMemo } from "react";

import PlayedAgainstMatchupCard from "./PlayedAgainstMatchupCard";
import { normalizePlayedAgainstEntries } from "./playedAgainstUtils";

const EmptyMatchups = () => (
  <span className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-sm text-gray-300">
    No recent matchups
  </span>
);

const PlayedAgainstCard = ({
  teamName,
  opposition = [],
  homeCourt = [],
  result = [],
  pointsFor = [],
  pointsAgainst = [],
}) => {
  const roundEntries = useMemo(
    () =>
      normalizePlayedAgainstEntries({
        teamName,
        opposition,
        homeCourt,
        result,
        pointsFor,
        pointsAgainst,
      }),
    [homeCourt, opposition, pointsAgainst, pointsFor, result, teamName]
  );

  return (
    <div className="flex flex-col gap-4">
      {roundEntries.length === 0 ? (
        <EmptyMatchups />
      ) : (
        roundEntries.map((entry) => <PlayedAgainstMatchupCard key={entry.key} entry={entry} />)
      )}
    </div>
  );
};

export default PlayedAgainstCard;
