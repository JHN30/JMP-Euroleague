import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useTeam } from "../func/useTeam";
import ErrorBox from "../components/ErrorBox";
import LoadingSpinner from "../components/LoadingSpinner";

const TeamCard = ({ team }) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="card bg-neutral card-md h-full">
      <div className="card-body bg-orange-400 p-4 items-center justify-center rounded-t-md">
        <h2 className="flex items-center justify-center text-white text-base font-bold">{team.name}</h2>
      </div>
      <figure className="mt-2 mb-2">
        <img
          src={team.logoImg}
          className="flex items-center justify-center object-contain w-24 h-24"
          alt={`${team.name} logo`}
        />
      </figure>
    </motion.div>
  );
};

const TeamsPage = () => {
  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const sortConfig = {
    key: "name",
  };

  // Fetch teams data when the component mounts
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

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

  const sortedTeams = [...teams.data].sort((a, b) => {
    let aValue, bValue;
    aValue = a[sortConfig.key];
    bValue = b[sortConfig.key];

    return aValue > bValue ? 1 : -1;
  });

  return (
    <>
      <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 gap-2 m-2">
        {sortedTeams.map((team, idx) => {
          return (
            <Link to={`/team-stats/${team._id}`} className="block h-full" key={idx}>
              <TeamCard team={team} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default TeamsPage;
