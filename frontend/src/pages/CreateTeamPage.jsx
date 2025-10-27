import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import Input from "../components/common/Input";

import { AiOutlineTeam } from "react-icons/ai";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { RiFileUploadLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

import { useTeam } from "../hooks/useTeam";

const CreateTeamPage = () => {
  const [team, setTeam] = useState({
    name: "",
    logoImg: "",
    season: "",
  });

  const { createTeam, fetchTeams, loadingTeams } = useTeam();

  const handleCreateTeam = async (event) => {
    event.preventDefault();

    try {
      await createTeam(team);
      setTeam({ name: "", logoImg: "", season: "" });
      toast.success("Team created successfully");
      fetchTeams();
    } catch (error) {
      toast.error(`Failed to create team: ${error.message}`);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTeam((prev) => ({ ...prev, logoImg: String(reader.result ?? "") }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 shadow-inner shadow-black/40 backdrop-blur"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-12 h-56 w-56 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute -bottom-20 right-6 h-48 w-48 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:120px_120px]" />
      </div>

      <div className="relative z-10 flex flex-col gap-8">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.4em] text-orange-200/80">Create Team</p>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Register a New Club</h2>
            <p className="text-sm text-gray-300 sm:max-w-lg">
              Add a fresh roster to the JMP ecosystem. Provide the baseline identity now and enrich it later with ratings,
              rounds, and performance data.
            </p>
          </div>

          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-3 shadow-inner shadow-black/40 sm:h-28 sm:w-28">
            {team.logoImg ? (
              <img
                src={team.logoImg}
                alt={`${team.name || "New team"} logo preview`}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-center text-xs text-gray-400">Logo preview</span>
            )}
          </div>
        </header>

        <form onSubmit={handleCreateTeam} className="grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <label htmlFor="team-name" className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-200">
                Team Name
              </label>
              <Input
                icon={AiOutlineTeam}
                id="team-name"
                type="text"
                placeholder="Fenerbahce Beko Istanbul"
                value={team.name}
                onChange={(event) => setTeam((prev) => ({ ...prev, name: event.target.value }))}
                required
                wrapperClassName="mb-0"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="team-season" className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-200">
                Season
              </label>
              <Input
                icon={HiOutlineCalendarDays}
                id="team-season"
                type="text"
                placeholder="2025"
                value={team.season}
                onChange={(event) => setTeam((prev) => ({ ...prev, season: event.target.value }))}
                wrapperClassName="mb-0"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="team-logo" className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-200">
              Team Logo
            </label>
            <p className="text-xs text-gray-400">PNG or JPG works best. A square canvas (512x512) keeps things crisp.</p>

            <input id="team-logo" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />

            <label
              htmlFor="team-logo"
              className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-4 text-sm text-gray-200 transition hover:border-orange-400/40 hover:text-white"
            >
              <span className="flex items-center gap-3">
                <RiFileUploadLine className="h-5 w-5 text-orange-300 transition group-hover:text-orange-200" />
                <span>Upload or drop image</span>
              </span>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-gray-300 transition group-hover:border-orange-400/30 group-hover:text-white">
                Browse
              </span>
            </label>

            {team.logoImg ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                <FaCheck className="h-3 w-3" />
                Image ready
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-400">
              Your new team will appear across standings, stats, and matchups once additional data is synced.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loadingTeams}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:from-orange-500/90 hover:to-amber-400/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaCirclePlus className="h-4 w-4" />
              <span>{loadingTeams ? "Creating..." : "Create Team"}</span>
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateTeamPage;
