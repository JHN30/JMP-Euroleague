import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import TeamCard from "../components/cards/TeamCard";
import TeamCardSkeleton from "../components/skeletons/TeamCardSkeleton";
import SeasonSelect from "../components/common/SeasonSelect";
import ErrorBox from "../components/errors/ErrorBox";
import DeleteTeamModal from "../components/admin/deleteTeam/DeleteTeamModal";

import { useTeam } from "../hooks/useTeam";
import { sortTeams } from "../utils/sortTeams";
import { DEFAULT_SEASON } from "../constants/appConstants";

const DeleteTeamPage = () => {
  const [selectedSeason, setSelectedSeason] = useState(DEFAULT_SEASON);
  const [pendingTeam, setPendingTeam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { fetchTeams, teams, deleteTeam, loadingTeams, errorTeams } = useTeam();

  useEffect(() => {
    fetchTeams(selectedSeason);
  }, [fetchTeams, selectedSeason]);

  const sortedTeams = useMemo(() => sortTeams(teams?.data ?? [], { key: "name" }), [teams?.data]);

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
      fetchTeams(selectedSeason);
    } catch (error) {
      console.error(`Error deleting ${pendingTeam.name}:`, error);
      toast.error(`Error deleting ${pendingTeam.name}. Please try again.`);
    }
  };

  if (loadingTeams) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 15 }).map((_, index) => (
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
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-400/90">Season</p>
          <SeasonSelect
            id="delete-team-season"
            className="mx-0 w-full sm:w-48"
            value={selectedSeason}
            onChange={(event) => setSelectedSeason(event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {sortedTeams.map((team) => {
          const stableKey = team._id ?? `${team.name}-${team.season ?? "unknown"}`;
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
