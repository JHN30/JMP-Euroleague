// import { useEffect, useState, useRef } from "react";

// import { useTeam } from "../func/useTeam";
// import { useRound } from "../func/useRound";

// import Team from "./Team";
// import TeamSkeleton from "../skeletons/TeamSkeleton";
// import ErrorBox from "./ErrorBox";
// import { calculateAndUpdateRatings } from "../utils/ratingsCalculator";

// const Teams = () => {
//   const { fetchTeams, updateTeamRating, teams, loadingTeams, errorTeams } = useTeam();
//   const { fetchRounds, updateRound, rounds, loadingRounds, errorRounds } = useRound();
//   const [sortConfig, setSortConfig] = useState({
//     key: "rating",
//     order: "desc",
//   });
//   const [oldRatings, setOldRatings] = useState([]);
//   const [updatedRatings, setUpdatedRatings] = useState([]);
//   const calculationDoneRef = useRef(false);

//   // Fetch teams data when the component mounts
//   useEffect(() => {
//     fetchTeams();
//     fetchRounds();
//   }, [fetchTeams, fetchRounds]);

//   useEffect(() => {
//     // Only proceed if we have rounds data
//     if (!calculationDoneRef.current && teams?.data?.length > 0 && rounds?.data?.[0] && !loadingTeams && !loadingRounds) {
//       const dbCurrentRound = rounds.data[0].currentRound;
//       const dbLatestRound = rounds.data[0].latestRound;
//       if (dbCurrentRound < dbLatestRound) {
//         calculateAndUpdateRatings(
//           dbCurrentRound,
//           dbLatestRound,
//           teams,
//           rounds,
//           updateTeamRating,
//           updateRound,
//           fetchTeams,
//           fetchRounds,
//           setOldRatings,
//           setUpdatedRatings
//         );
//       }
//       // TESTING PURPOSE
//       // let i = 0;
//       // while (i < 1) {
//       //   calculateAndUpdateRatings(dbCurrentRound, dbLatestRound, teams, rounds, updateTeamRating, updateRound, fetchTeams, fetchRounds, setOldRatings, setUpdatedRatings);
//       //   i += 1;
//       // }
//       calculationDoneRef.current = true;
//     }
//   }, [teams, rounds, loadingTeams, loadingRounds]);

//   // Check if the teams data is still loading
//   if (loadingTeams || loadingRounds) {
//     return (
//       <div className="flex flex-col w-full h-full">
//         <TeamSkeleton />
//         <TeamSkeleton />
//         <TeamSkeleton />
//         <TeamSkeleton />
//         <TeamSkeleton />
//         <TeamSkeleton />
//         <TeamSkeleton />
//         <TeamSkeleton />
//         <TeamSkeleton />
//         <TeamSkeleton />
//       </div>
//     );
//   }

//   // Check if there was an error fetching the teams
//   if (errorTeams || errorRounds) {
//     return (
//       <div className="flex items-center justify-center h-full w-full py-20">
//         <ErrorBox error={errorTeams} />
//         <ErrorBox error={errorRounds} />
//       </div>
//     );
//   }

//   const handleSort = (key) => {
//     let order = "asc";
//     if (sortConfig.key === key && sortConfig.order === "asc") {
//       order = "desc";
//     }
//     setSortConfig({ key, order });
//   };

//   const sortedTeams = [...teams.data].sort((a, b) => {
//     let aValue, bValue;

//     if (sortConfig.key === "rating") {
//       // Ensure ratings are parsed as numbers
//       aValue = parseFloat(updatedRatings[teams.data.indexOf(a)] || a.rating || 0);
//       bValue = parseFloat(updatedRatings[teams.data.indexOf(b)] || b.rating || 0);
//     } else {
//       aValue = a[sortConfig.key];
//       bValue = b[sortConfig.key];
//     }

//     // For numerical comparisons
//     if (typeof aValue === "number" && typeof bValue === "number") {
//       if (sortConfig.order === "asc") {
//         return aValue - bValue;
//       } else {
//         return bValue - aValue;
//       }
//     }

//     // For string comparisons
//     if (sortConfig.order === "asc") {
//       return aValue > bValue ? 1 : -1;
//     } else {
//       return aValue < bValue ? 1 : -1;
//     }
//   });

//   return (
//     <div className="overflow-x-auto">
//       <table className="table table-md">
//         <thead className="border-b-3 border-orange-400">
//           <tr>
//             <th>Pos</th>
//             <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
//               Name {sortConfig.key === "name" && (sortConfig.order === "asc" ? "▲" : "▼")}
//             </th>
//             <th onClick={() => handleSort("wins")} style={{ cursor: "pointer" }}>
//               Win {sortConfig.key === "wins" && (sortConfig.order === "asc" ? "▲" : "▼")}
//             </th>
//             <th onClick={() => handleSort("losses")} style={{ cursor: "pointer" }}>
//               Loss {sortConfig.key === "losses" && (sortConfig.order === "asc" ? "▲" : "▼")}
//             </th>
//             <th onClick={() => handleSort("winPercentage")} style={{ cursor: "pointer" }}>
//               Win% {sortConfig.key === "winPercentage" && (sortConfig.order === "asc" ? "▲" : "▼")}
//             </th>
//             <th>Form</th>
//             <th onClick={() => handleSort("rating")} style={{ cursor: "pointer" }}>
//               Rating {sortConfig.key === "rating" && (sortConfig.order === "asc" ? "▲" : "▼")}
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedTeams.map((team, index) => {
//             const currentPosition = index + 1;
//             // Find the updated rating for this team in the updatedRatings array
//             const teamIndex = teams.data.indexOf(team);
//             //const updatedRating = updatedRatings[teamIndex] || team.rating;

//             return (
//               <Team
//                 key={team.name}
//                 team={{
//                   ...team,
//                   rating: teams.data[teamIndex].rating,
//                 }}
//                 position={currentPosition}
//               />
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Teams;
