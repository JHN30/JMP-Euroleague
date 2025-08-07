import { useEffect, useState, useRef } from "react";

import { useTeam } from "../func/useTeam";
import { useRound } from "../func/useRound";

import Team from "./Team";
import TeamSkeleton from "../skeletons/TeamSkeleton";
import ErrorBox from "./ErrorBox";
import { calculateELOStandings } from "../utils/calculateExpectedScore";

const Teams = () => {
  const { fetchTeams, updateTeamRating, teams, loadingTeams, errorTeams } = useTeam();
  const { fetchRounds, updateRound, rounds, loadingRounds, errorRounds } = useRound();
  const [sortConfig, setSortConfig] = useState({
    key: "rating",
    order: "desc",
  });
  const [oldRatings, setOldRatings] = useState([]);
  const [updatedRatings, setUpdatedRatings] = useState([]);
  const calculationDoneRef = useRef(false);

  // Fetch teams data when the component mounts
  useEffect(() => {
    fetchTeams();
    fetchRounds();
  }, [fetchTeams, fetchRounds]);

  const calculateAndUpdateRatings = async (dbCurrentRound, dbLatestRound) => {
    try {
      if (!teams?.data?.length) {
        return;
      }

      const initialRatings = teams.data.map((team) => team.rating);
      let updatedRatingsArray = [...initialRatings];
      let oldRatingsArray = [...initialRatings];

      // Calculate new ratings for each round
      for (let round = dbCurrentRound; round <= dbLatestRound; round++) {
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
          rating: updatedRatingsArray[index], //updatedRatingsArray[index], //1000 default
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

  useEffect(() => {
    // Only proceed if we have rounds data
    if (!calculationDoneRef.current && teams?.data?.length > 0 && rounds?.data?.[0] && !loadingTeams && !loadingRounds) {
      const dbCurrentRound = rounds.data[0].currentRound;
      const dbLatestRound = rounds.data[0].latestRound;
      if (dbCurrentRound < dbLatestRound) {
        calculateAndUpdateRatings(dbCurrentRound, dbLatestRound);
      }
      // TESTING PURPOSE
      // let i = 0;
      // while (i < 1) {
      //   calculateAndUpdateRatings(dbCurrentRound, dbLatestRound);
      //   i += 1;
      // }
      calculationDoneRef.current = true;
    }
  }, [teams, rounds, loadingTeams, loadingRounds]);

  // Check if the teams data is still loading
  if (loadingTeams || loadingRounds) {
    return (
      <div className="flex flex-col w-full h-full">
        <TeamSkeleton />
        <TeamSkeleton />
        <TeamSkeleton />
        <TeamSkeleton />
        <TeamSkeleton />
        <TeamSkeleton />
        <TeamSkeleton />
        <TeamSkeleton />
        <TeamSkeleton />
        <TeamSkeleton />
      </div>
    );
  }

  // Check if there was an error fetching the teams
  if (errorTeams || errorRounds) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <ErrorBox error={errorTeams} />
        <ErrorBox error={errorRounds} />
      </div>
    );
  }

  const handleSort = (key) => {
    let order = "asc";
    if (sortConfig.key === key && sortConfig.order === "asc") {
      order = "desc";
    }
    setSortConfig({ key, order });
  };

  const sortedTeams = [...teams.data].sort((a, b) => {
    let aValue, bValue;

    if (sortConfig.key === "rating") {
      // Ensure ratings are parsed as numbers
      aValue = parseFloat(updatedRatings[teams.data.indexOf(a)] || a.rating || 0);
      bValue = parseFloat(updatedRatings[teams.data.indexOf(b)] || b.rating || 0);
    } else {
      aValue = a[sortConfig.key];
      bValue = b[sortConfig.key];
    }

    // For numerical comparisons
    if (typeof aValue === "number" && typeof bValue === "number") {
      if (sortConfig.order === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }

    // For string comparisons
    if (sortConfig.order === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="overflow-x-auto">
      <table className="table table-md">
        <thead className="border-b-3 border-orange-400">
          <tr>
            <th>Pos</th>
            <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
              Name {sortConfig.key === "name" && (sortConfig.order === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("wins")} style={{ cursor: "pointer" }}>
              Win {sortConfig.key === "wins" && (sortConfig.order === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("losses")} style={{ cursor: "pointer" }}>
              Loss {sortConfig.key === "losses" && (sortConfig.order === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("winPercentage")} style={{ cursor: "pointer" }}>
              Win% {sortConfig.key === "winPercentage" && (sortConfig.order === "asc" ? "▲" : "▼")}
            </th>
            <th>Form</th>
            <th onClick={() => handleSort("rating")} style={{ cursor: "pointer" }}>
              Rating {sortConfig.key === "rating" && (sortConfig.order === "asc" ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team, index) => {
            const currentPosition = index + 1;
            // Find the updated rating for this team in the updatedRatings array
            const teamIndex = teams.data.indexOf(team);
            //const updatedRating = updatedRatings[teamIndex] || team.rating;

            return (
              <Team
                key={team.name}
                team={{
                  ...team,
                  rating: teams.data[teamIndex].rating,
                }}
                position={currentPosition}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Teams;
