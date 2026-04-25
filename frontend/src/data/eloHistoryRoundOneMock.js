import eloHistoryRoundOneCsv from "../../../elo_history_3.1_rating_round_1.csv?raw";

const parseCsvLine = (line) => {
  const cells = [];
  let currentCell = "";
  let isQuoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"') {
      if (isQuoted && nextChar === '"') {
        currentCell += '"';
        index += 1;
      } else {
        isQuoted = !isQuoted;
      }

      continue;
    }

    if (char === "," && !isQuoted) {
      cells.push(currentCell.trim());
      currentCell = "";
      continue;
    }

    currentCell += char;
  }

  cells.push(currentCell.trim());
  return cells;
};

const parseCsv = (csvText) => {
  const lines = String(csvText || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const [headerLine, ...dataLines] = lines;

  if (!headerLine) {
    return [];
  }

  const headers = parseCsvLine(headerLine);

  return dataLines.map((line) => {
    const values = parseCsvLine(line);

    return headers.reduce((row, header, index) => {
      row[header] = values[index] ?? "";
      return row;
    }, {});
  });
};

const toNumber = (value, fallback = 0) => {
  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : fallback;
};

const toOutcomeLabel = (value) => {
  const normalizedValue = String(value || "").trim().toUpperCase();

  if (normalizedValue === "W") {
    return "Win";
  }

  if (normalizedValue === "L") {
    return "Loss";
  }

  return normalizedValue || "-";
};

const normalizeTeamUpdate = (row, index) => {
  const roundNumber = Math.round(toNumber(row.round));
  const predictionResult = String(row.prediction_result || "").trim();
  const predictedPick = String(row.predicted_pick || "").trim().toUpperCase();
  const actualResult = String(row.actual_result || "").trim().toUpperCase();
  const venueShort = String(row.home_away || "").trim().toUpperCase();
  const team = String(row.team || "").trim();
  const opponent = String(row.opponent || "").trim();

  return {
    id: `${roundNumber}-${index}-${team}-${opponent}`,
    roundNumber,
    team,
    opponent,
    venue: venueShort === "H" ? "Home" : venueShort === "A" ? "Away" : "-",
    venueShort,
    status: String(row.status || "").trim(),
    predictedPick,
    predictedPickLabel: toOutcomeLabel(predictedPick),
    actualResult,
    actualResultLabel: toOutcomeLabel(actualResult),
    predictionResult,
    isCorrect: predictionResult.toLowerCase() === "correct",
    predictedWinProbability: toNumber(row.predicted_win_probability),
    preRoundRating: toNumber(row.pre_round_rating),
    postRoundRating: toNumber(row.post_round_rating),
    ratingDelta: toNumber(row.rating_delta),
  };
};

const getMatchKey = (teamUpdate) =>
  [
    teamUpdate.roundNumber,
    ...[teamUpdate.team, teamUpdate.opponent].sort((firstTeam, secondTeam) =>
      firstTeam.localeCompare(secondTeam)
    ),
  ].join("::");

const buildMatchups = (teamUpdates) => {
  const groupedMatchups = teamUpdates.reduce((matchupsByKey, teamUpdate) => {
    const matchKey = getMatchKey(teamUpdate);
    const existingTeamUpdates = matchupsByKey.get(matchKey) ?? [];

    matchupsByKey.set(matchKey, [...existingTeamUpdates, teamUpdate]);
    return matchupsByKey;
  }, new Map());

  return Array.from(groupedMatchups.values())
    .map((matchupRows, index) => {
      const homeRow = matchupRows.find((row) => row.venueShort === "H") ?? matchupRows[0] ?? {};
      const awayRow =
        matchupRows.find((row) => row.venueShort === "A") ??
        matchupRows.find((row) => row.team !== homeRow.team) ??
        matchupRows[1] ??
        {};
      const predictedWinnerRow = matchupRows.find((row) => row.predictedPick === "W") ?? homeRow;
      const actualWinnerRow = matchupRows.find((row) => row.actualResult === "W") ?? homeRow;
      const isCorrect = predictedWinnerRow.team === actualWinnerRow.team;
      const ratingSwing = Math.max(0, ...matchupRows.map((row) => Math.abs(toNumber(row.ratingDelta))));

      return {
        id: `${homeRow.roundNumber}-${index}-${homeRow.team}-${awayRow.team}`,
        roundNumber: homeRow.roundNumber,
        homeTeam: homeRow.team,
        awayTeam: awayRow.team,
        predictedWinner: predictedWinnerRow.team,
        actualWinner: actualWinnerRow.team,
        isCorrect,
        predictionResult: isCorrect ? "Correct" : "Incorrect",
        predictedWinnerProbability: predictedWinnerRow.predictedWinProbability,
        homeWinProbability: homeRow.predictedWinProbability,
        awayWinProbability: awayRow.predictedWinProbability,
        ratingSwing,
        home: homeRow,
        away: awayRow,
      };
    })
    .sort((firstMatchup, secondMatchup) => firstMatchup.homeTeam.localeCompare(secondMatchup.homeTeam));
};

const buildRoundDetailsByRound = (teamUpdates) => {
  const updatesByRound = teamUpdates.reduce((roundMap, teamUpdate) => {
    const roundUpdates = roundMap.get(teamUpdate.roundNumber) ?? [];

    roundMap.set(teamUpdate.roundNumber, [...roundUpdates, teamUpdate]);
    return roundMap;
  }, new Map());

  return Array.from(updatesByRound.entries()).reduce((detailsByRound, [roundNumber, roundUpdates]) => {
    const matchups = buildMatchups(roundUpdates);
    const correctGames = matchups.filter((matchup) => matchup.isCorrect).length;
    const wrongGames = Math.max(0, matchups.length - correctGames);
    const correctTeamRows = roundUpdates.filter((teamUpdate) => teamUpdate.isCorrect).length;
    const wrongTeamRows = Math.max(0, roundUpdates.length - correctTeamRows);
    const confidenceSamples = matchups
      .map((matchup) => matchup.predictedWinnerProbability)
      .filter((probability) => Number.isFinite(probability));
    const averagePredictedWinnerProbability =
      confidenceSamples.length > 0
        ? confidenceSamples.reduce((sum, probability) => sum + probability, 0) / confidenceSamples.length
        : 0;
    const biggestRatingSwing = matchups.reduce(
      (selectedMatchup, currentMatchup) =>
        !selectedMatchup || currentMatchup.ratingSwing > selectedMatchup.ratingSwing ? currentMatchup : selectedMatchup,
      null
    );

    detailsByRound[roundNumber] = {
      roundNumber,
      matchups,
      teamUpdates: roundUpdates,
      summary: {
        games: matchups.length,
        correctGames,
        wrongGames,
        teamRows: roundUpdates.length,
        correctTeamRows,
        wrongTeamRows,
        averagePredictedWinnerProbability,
        biggestRatingSwing,
      },
    };

    return detailsByRound;
  }, {});
};

const eloHistoryTeamUpdates = parseCsv(eloHistoryRoundOneCsv)
  .map((row, index) => normalizeTeamUpdate(row, index))
  .filter((teamUpdate) => teamUpdate.roundNumber > 0 && teamUpdate.team && teamUpdate.opponent);

export const eloHistoryRoundDetailsByRound = buildRoundDetailsByRound(eloHistoryTeamUpdates);
