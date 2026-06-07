const WIN_SCORE_CLASSES = "border-emerald-400/60 bg-emerald-500/10 text-emerald-200";
const LOSS_SCORE_CLASSES = "border-rose-400/60 bg-rose-500/10 text-rose-200";

const toArray = (value) => (Array.isArray(value) ? value : []);

const getCourtState = (value) => {
  const flag = String(value ?? "").toUpperCase();

  return {
    flag,
    isHome: flag === "H",
    isAway: flag === "A",
  };
};

const getTeamLabels = ({ teamName, opponent, isHome, isAway }) => {
  const safeTeamName = teamName ?? "-";

  if (isHome) {
    return {
      homeLabel: safeTeamName,
      awayLabel: opponent,
    };
  }

  if (isAway) {
    return {
      homeLabel: opponent,
      awayLabel: safeTeamName,
    };
  }

  return {
    homeLabel: safeTeamName,
    awayLabel: opponent,
  };
};

const getTeamCaptions = ({ hasNeutralCourt }) => ({
  homeCaption: hasNeutralCourt ? "Team" : "Home",
  awayCaption: hasNeutralCourt ? "Opponent" : "Away",
});

const getTeamTextClasses = ({ isHome, isAway, hasNeutralCourt }) => ({
  homeTextClass: isHome || hasNeutralCourt ? "text-white" : "text-gray-300",
  awayTextClass: isAway || hasNeutralCourt ? "text-white" : "text-gray-300",
});

const getScoreState = ({ homeScore, awayScore, result }) => {
  const rawTeamScore = Number(homeScore);
  const rawOppScore = Number(awayScore);
  const hasScores = Number.isFinite(rawTeamScore) && Number.isFinite(rawOppScore);
  const didWin = hasScores ? rawTeamScore > rawOppScore : String(result).toUpperCase() === "W";

  return {
    hasScores,
    didWin,
    rawTeamScore,
    rawOppScore,
  };
};

const getDisplayScore = ({ hasScores, didWin, isHome, isAway, rawTeamScore, rawOppScore }) => {
  if (!hasScores) {
    return didWin ? "W" : "L";
  }

  if (isAway) {
    return `${rawOppScore} - ${rawTeamScore}`;
  }

  return `${rawTeamScore} - ${rawOppScore}`;
};

const getVenueLabel = ({ flag, isHome, isAway }) => {
  if (isHome) {
    return "Home";
  }

  if (isAway) {
    return "Away";
  }

  return flag || "Neutral";
};

const normalizePlayedAgainstEntry = ({ teamName, source, index, totalRounds }) => {
  const opponent = source.opponent ?? "-";
  const { flag, isHome, isAway } = getCourtState(source.homeCourt);
  const hasNeutralCourt = !isHome && !isAway;
  const scoreState = getScoreState({
    homeScore: source.pointsFor,
    awayScore: source.pointsAgainst,
    result: source.result,
  });

  return {
    key: `${opponent}-${index}`,
    roundLabel: `Round ${totalRounds - index}`,
    venueLabel: getVenueLabel({ flag, isHome, isAway }),
    ...getTeamLabels({ teamName, opponent, isHome, isAway }),
    ...getTeamCaptions({ hasNeutralCourt }),
    ...getTeamTextClasses({ isHome, isAway, hasNeutralCourt }),
    displayScore: getDisplayScore({ ...scoreState, isHome, isAway }),
    scoreClasses: scoreState.didWin ? WIN_SCORE_CLASSES : LOSS_SCORE_CLASSES,
    hasScores: scoreState.hasScores,
    didWin: scoreState.didWin,
  };
};

export const normalizePlayedAgainstEntries = ({
  teamName,
  opposition,
  homeCourt,
  result,
  pointsFor,
  pointsAgainst,
}) => {
  const safeOpposition = toArray(opposition);
  const safeHome = toArray(homeCourt);
  const safeResult = toArray(result);
  const safePointsFor = toArray(pointsFor);
  const safePointsAgainst = toArray(pointsAgainst);

  return safeOpposition.map((opponent, index) =>
    normalizePlayedAgainstEntry({
      teamName,
      index,
      totalRounds: safeOpposition.length,
      source: {
        opponent,
        homeCourt: safeHome[index],
        result: safeResult[index],
        pointsFor: safePointsFor[index],
        pointsAgainst: safePointsAgainst[index],
      },
    })
  );
};
