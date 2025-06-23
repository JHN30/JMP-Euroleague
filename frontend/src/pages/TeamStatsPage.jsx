import { useParams } from "react-router-dom";
import { useTeam } from "../func/useTeam";
import { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorBox from "../components/ErrorBox";

const TeamStatsPage = () => {
  const { fetchTeamById, team, loadingTeams, errorTeams } = useTeam();

  const { teamId } = useParams();

  useEffect(() => {
    fetchTeamById(teamId);
  }, [fetchTeamById]);

  if (loadingTeams) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <LoadingSpinner />
      </div>
    );
  }

  // Check if there was an error fetching the teams
  if (errorTeams) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <ErrorBox error={errorTeams} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1>{team.data.name}</h1>
        <img src={team.data.logoImg} alt={`${team.data.name} logo`} className="w-32 h-auto" />
      </div>
      <div className="flex flex-col">
        <p>Wins: {team.data.wins}</p>
        <p>Losses: {team.data.losses}</p>
        <p>Win Percentage: {team.data.winPercentage}</p>
        <p>Form: {team.data.form}</p>
        <p>Played Against: {team.data.playedAgainst}</p>
        <p>Rating: {team.data.rating}</p>
      </div>
    </div>
  );
};

export default TeamStatsPage;
