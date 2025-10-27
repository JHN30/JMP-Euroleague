import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import ErrorBox from "../components/errors/ErrorBox";
import StatsCard from "../components/cards/StatsCard";
import FormCard from "../components/cards/FormCard";
import PlayedAgainstCard from "../components/cards/PlayedAgainstCard";
import PageShell, { pageCardClass } from "../components/layout/PageShell";
import TeamStatsSkeleton from "../components/skeletons/TeamStatsSkeleton";

import { useTeam } from "../hooks/useTeam";

import { FaCheckDouble } from "react-icons/fa";
import { HiOutlineX } from "react-icons/hi";
import { FaPercentage } from "react-icons/fa";
import { SlGraph } from "react-icons/sl";
import { FaBasketball } from "react-icons/fa6";

const TeamStatsPage = () => {
  const { fetchTeamById, team, loadingTeams, errorTeams } = useTeam();
  const { teamId } = useParams();
  const [gamesToShow, setGamesToShow] = useState(5);

  useEffect(() => {
    fetchTeamById(teamId);
  }, [fetchTeamById, teamId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [teamId]);

  const teamData = team?.data ?? {};
  const selectedSeason = String(teamData.season ?? "");
  const isLegacySeason = selectedSeason === "2024";
  const ratingLabel = isLegacySeason ? "JMP Rating 1.0" : "JMP Rating 2.0";
  const rawRatingValue = isLegacySeason ? Number(teamData.rating) : Number(teamData.rating2);
  const ratingValueDisplay = Number.isFinite(rawRatingValue) ? rawRatingValue.toFixed(0) : "0";

  if (loadingTeams) {
    return (
      <PageShell>
        <TeamStatsSkeleton />
      </PageShell>
    );
  }

  if (errorTeams) {
    return (
      <PageShell>
        <div className={`${pageCardClass} flex min-h-[50vh] items-center justify-center`}>
          <ErrorBox error={errorTeams} />
        </div>
      </PageShell>
    );
  }

  const oppositionArray = Array.isArray(teamData.playedAgainst) ? teamData.playedAgainst.slice().reverse() : [];
  const homeCourtArray = Array.isArray(teamData.homeGround) ? teamData.homeGround.slice().reverse() : [];
  const resultArray = Array.isArray(teamData.form) ? teamData.form.slice().reverse() : [];
  const pointsForArray = Array.isArray(teamData.pointsPlusArray) ? teamData.pointsPlusArray.slice().reverse() : [];
  const pointsAgainstArray = Array.isArray(teamData.pointsMinusArray) ? teamData.pointsMinusArray.slice().reverse() : [];

  return (
    <PageShell>
      <div className="flex flex-col gap-8 text-white">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${pageCardClass} overflow-hidden`}
        >
          <div className="relative flex flex-col gap-8 px-6 py-8 sm:px-8 lg:flex-row lg:items-center">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-32 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />
              <div className="absolute -bottom-24 right-8 h-60 w-60 rounded-full bg-amber-400/15 blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-1 flex-col gap-6">
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[0.35em] text-orange-200/70">Team Profile</p>
                <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{teamData.name}</h1>
                <p className="text-sm text-gray-300">Season {selectedSeason || "-"}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-inner shadow-black/40">
                  <p className="text-[0.65rem] uppercase tracking-[0.4em] text-orange-200/80">Record</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {Number(teamData.wins ?? 0)}&nbsp;-&nbsp;{Number(teamData.losses ?? 0)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-inner shadow-black/40">
                  <p className="text-[0.65rem] uppercase tracking-[0.4em] text-orange-200/80">Win %</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {teamData.winPercentage ? `${teamData.winPercentage.toFixed(2)}%` : "0%"}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-orange-400/50 bg-orange-500/15 px-4 py-2 text-sm font-semibold text-orange-100 shadow-[0_0_30px_rgba(249,115,22,0.25)]">
                  <SlGraph className="h-4 w-4" />
                  <span>
                    {ratingLabel}: <span className="text-white">{ratingValueDisplay}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex justify-center lg:justify-end">
              <div className="absolute inset-0 -top-6 h-full w-full rounded-[2.5rem] bg-gradient-to-tr from-orange-500/30 to-amber-400/20 blur-3xl" />
              <div className="relative flex h-48 w-48 items-center justify-center rounded-[2.5rem] border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl sm:h-56 sm:w-56">
                {teamData.logoImg ? (
                  <img
                    className="h-full w-full object-contain"
                    src={teamData.logoImg}
                    alt={`${teamData.name ?? "Team"} logo`}
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">No logo</div>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className={`${pageCardClass} px-6 py-6 sm:px-8`}
        >
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-orange-200/80">Team Pulse</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Key Metrics</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <StatsCard
                title="Wins"
                value={teamData.wins}
                icon={FaCheckDouble}
                iconColor="text-emerald-400/30"
                accent="bg-emerald-500/30"
              />
              <StatsCard
                title="Losses"
                value={teamData.losses}
                icon={HiOutlineX}
                iconColor="text-rose-400/30"
                accent="bg-rose-500/30"
              />
              <StatsCard
                title="Win Percentage"
                value={teamData.winPercentage ? `${teamData.winPercentage.toFixed(2)}%` : "0%"}
                icon={FaPercentage}
                iconColor="text-amber-400/30"
                accent="bg-amber-500/30"
              />
              <StatsCard
                title="PTS+"
                value={teamData.pointsPlus}
                icon={FaBasketball}
                iconColor="text-sky-400/30"
                accent="bg-sky-500/30"
              />
              <StatsCard
                title="PTS-"
                value={teamData.pointsMinus}
                icon={FaBasketball}
                iconColor="text-indigo-400/30"
                accent="bg-indigo-500/30"
              />
              <StatsCard
                title={ratingLabel}
                value={ratingValueDisplay}
                icon={SlGraph}
                iconColor="text-orange-400/30"
                accent="bg-orange-500/30"
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className={`${pageCardClass} overflow-hidden`}
        >
          <div className="flex flex-col gap-6 px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-orange-200/80">Momentum</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Recent Form</h2>
              </div>
              <div className="flex gap-3">
                {[
                  { label: "Last 5 games", value: 5 },
                  { label: "Last 10 games", value: 10 },
                ].map((option) => {
                  const isActive = gamesToShow === option.value;
                  return (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setGamesToShow(option.value)}
                      className={`relative flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                        isActive
                          ? "border-orange-400/60 bg-orange-500/20 text-orange-100 shadow-[0_0_30px_rgba(249,115,22,0.2)]"
                          : "border-white/10 bg-white/5 text-gray-200 hover:border-orange-400/40 hover:text-orange-100"
                      }`}
                    >
                      <span>{option.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <FormCard value={Array.isArray(teamData.form) ? teamData.form : []} gridColumns={gamesToShow} />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`${pageCardClass} overflow-hidden`}
        >
          <div className="flex flex-col gap-6 px-6 py-6 sm:px-8">
            <div className="border-b border-white/10 pb-6">
              <p className="text-xs uppercase tracking-[0.4em] text-orange-200/80">Scouting Tape</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Head-to-Head Snapshot</h2>
            </div>
            <PlayedAgainstCard
              teamName={teamData.name}
              opposition={oppositionArray}
              homeCourt={homeCourtArray}
              result={resultArray}
              pointsFor={pointsForArray}
              pointsAgainst={pointsAgainstArray}
            />
          </div>
        </motion.section>
      </div>
    </PageShell>
  );
};

export default TeamStatsPage;
