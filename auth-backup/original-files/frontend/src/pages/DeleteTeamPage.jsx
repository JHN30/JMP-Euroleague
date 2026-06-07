import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import TeamCard from "../components/cards/TeamCard";
import TeamCardSkeleton from "../components/skeletons/TeamCardSkeleton";
import ErrorBox from "../components/errors/ErrorBox";
import DeleteTeamModal from "../components/admin/deleteTeam/DeleteTeamModal";

import { useTeam } from "../hooks/useTeam";
import { sortTeams } from "../utils/sortTeams";

const deleteTeamGridClass = "grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5";

const DeleteTeamPage = () => {
  const [pendingTeam, setPendingTeam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { fetchTeams, teams, deleteTeam, loadingTeams, errorTeams } = useTeam();

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const teamList = teams?.data ?? [];
  const sortedTeams = useMemo(() => sortTeams(teamList, { key: "name" }), [teamList]);

  const openModal = (team) => {
    setPendingTeam(team);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setPendingTeam(null);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!pendingTeam?._id) {
      return;
    }
    try {
      await deleteTeam(pendingTeam._id);
      toast.success(`${pendingTeam.name} deleted successfully.`);
      closeModal();
      fetchTeams();
    } catch (error) {
      console.error(`Error deleting ${pendingTeam.name}:`, error);
      toast.error(`Error deleting ${pendingTeam.name}. Please try again.`);
    }
  };

  if (loadingTeams) {
    return (
      <div className={deleteTeamGridClass}>
        {Array.from({ length: 8 }).map((_, index) => (
          <TeamCardSkeleton key={`team-skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (errorTeams) {
    return (
      <div className="flex h-full w-full items-center justify-center py-20">
        <ErrorBox error={errorTeams} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className={deleteTeamGridClass}>
        {sortedTeams.map((team) => {
          const stableKey = team._id ?? `${team.name}`;
          return (
            <button
              key={stableKey}
              type="button"
              onClick={() => openModal(team)}
              className="block h-full rounded-3xl border border-transparent transition hover:-translate-y-1 hover:border-orange-400/40 hover:shadow-lg hover:shadow-orange-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <TeamCard team={team} />
            </button>
          );
        })}
      </div>

      <DeleteTeamModal team={pendingTeam} isOpen={isModalOpen} onCancel={closeModal} onConfirm={handleDelete} />
    </div>
  );
};

export default DeleteTeamPage;
