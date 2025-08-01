import { motion } from "framer-motion";
import toast from "react-hot-toast";

import LoadingSpinner from "../components/LoadingSpinner";

import { useTeam } from "../func/useTeam";

import { useState } from "react";

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

const DeleteTeamPage = ({ teams }) => {
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const sortConfig = {
    key: "name",
  };

  const { deleteTeam, loadingTeams, errorTeams } = useTeam();

  const sortedTeams = [...teams.data].sort((a, b) => {
    let aValue, bValue;
    aValue = a[sortConfig.key];
    bValue = b[sortConfig.key];

    return aValue > bValue ? 1 : -1;
  });

  const handleModal = (team) => {
    setSelectedTeamId(team._id);
    setSelectedTeamName(team.name);
    document.getElementById("delete_team").showModal();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteTeam(selectedTeamId);
      document.getElementById("delete_team").close();
      toast.success(`${selectedTeamName} deleted successfully`);
      setSelectedTeamId("");
      setSelectedTeamName("");
    } catch {
      toast.error(`Error deleting ${selectedTeamName}`);
      console.log(`Error deleting ${selectedTeamName}: `, errorTeams);
    }
  };

  if (loadingTeams) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 gap-2 m-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {sortedTeams.map((team, idx) => {
          return (
            <button onClick={() => handleModal(team)} className="block h-full hover:cursor-pointer" key={idx}>
              <TeamCard team={team} />
            </button>
          );
        })}
        <dialog id="delete_team" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">DELETE {selectedTeamName.toUpperCase()}</h3>
            <p className="py-4">Are you sure you want to delete {selectedTeamName}</p>
            <div className="modal-action">
              <form method="dialog">
                <button
                  type="button"
                  className="bg-emerald-500 hover:bg-emerald-400 text-white text-md font-bold py-2 px-4 mx-4 rounded-2xl"
                  onClick={handleDelete}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="bg-red-600 hover:bg-red-500 text-white text-md font-bold py-2 px-4 rounded-2xl"
                  onClick={() => {
                    setSelectedTeamId("");
                    setSelectedTeamName("");
                    document.getElementById("delete_team").close();
                  }}
                >
                  No
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </motion.div>
    </>
  );
};

export default DeleteTeamPage;
