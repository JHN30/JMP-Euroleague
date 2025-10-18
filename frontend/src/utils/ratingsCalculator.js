import { calculateELOStandings } from "./calculateExpectedScore";

export const calculateAndUpdateRatings = async (
  dbCurrentRound,
  dbLatestRound,
  teams,
  rounds,
  updateTeamRating,
  updateRound,
  fetchTeams,
  fetchRounds,
  setOldRatings,
  setUpdatedRatings
) => {
  try {
    if (!teams?.data?.length) {
      return;
    }

    const initialRatings = teams.data.map((team) => {
      if (typeof team?.rating2 === "number" && !Number.isNaN(team.rating2)) {
        return team.rating2;
      }
      if (typeof team?.rating === "number" && !Number.isNaN(team.rating)) {
        return team.rating;
      }
      return 0;
    });

    let updatedRatingsArray = [...initialRatings];
    let oldRatingsArray = [...initialRatings];

    // Calculate new ratings for each round
    for (let round = dbCurrentRound; round < dbLatestRound; round++) {
      teams.data.forEach((team, index) => {
        const opponent = teams.data.find((opponentTeam) => opponentTeam.name === team.playedAgainst[round - 1]);

        const homeAdvantage = team.homeGround[round - 1];

        if (!opponent) {
          return;
        }

        //Form advantage array
        const arrayFormAdvantage =
          team.form[round - 2] === undefined
            ? []
            : team.form.slice(round - 6 <= 0 ? 0 : round - 6, round - 1 === 0 ? 1 : round - 1);

        const opponentArrayFormAdvantage =
          opponent.form[round - 2] === undefined
            ? []
            : opponent.form.slice(round - 6 <= 0 ? 0 : round - 6, round - 1 === 0 ? 1 : round - 1);

        //Form advantage array calculated
        const formAdvantage =
          arrayFormAdvantage.length === 0
            ? 0
            : arrayFormAdvantage.filter((result) => result === "W").length / arrayFormAdvantage.length;

        const opponentFormAdvantage =
          opponentArrayFormAdvantage.length === 0
            ? 0
            : opponentArrayFormAdvantage.filter((result) => result === "W").length / opponentArrayFormAdvantage.length;

        if (opponent) {
          const resultA = team.form[round - 1] === "W" ? 1 : 0;
          const opponentIndex = teams.data.indexOf(opponent);
          updatedRatingsArray[index] = parseFloat(
            calculateELOStandings(
              parseFloat(oldRatingsArray[index]),
              parseFloat(oldRatingsArray[opponentIndex]),
              resultA,
              homeAdvantage,
              formAdvantage,
              opponentFormAdvantage
            )
          );
        }
      });

      oldRatingsArray = [...updatedRatingsArray];
    }

    // Update state with new ratings
    setOldRatings(initialRatings);
    setUpdatedRatings(updatedRatingsArray);

    // Update rounds in database
    updateRound(rounds.data[0]._id, {
      currentRound: dbLatestRound,
      latestRound: dbLatestRound,
    })
      .then(() => {
        // After successfully updating the round in the database, update local state
        console.log("Round updated successfully, refreshing data");
        // Re-fetch rounds data to get the updated values
        fetchRounds();
      })
      .catch((error) => {
        console.error("Failed to update round:", error);
      });

    // Update ratings in database
    for (let index = 0; index < teams.data.length; index++) {
      updateTeamRating(teams.data[index]._id, {
        rating2: updatedRatingsArray[index],
      }).catch((error) => {
        console.error("Failed to update team:", error);
      });
      console.log("Team updated successfully, refreshing data");
      fetchTeams();
    }
  } catch (error) {
    console.error("Error calculating ratings:", error);
  }
};
