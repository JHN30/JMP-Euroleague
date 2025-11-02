import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import ErrorBox from "../components/errors/ErrorBox";
import StatsCard from "../components/cards/StatsCard";
import FormCard from "../components/cards/FormCard";
import PlayedAgainstCard from "../components/cards/PlayedAgainstCard";
import PageShell, { pageCardClass } from "../components/layout/PageShell";
import TeamStatsSkeleton from "../components/skeletons/TeamStatsSkeleton";
import TeamProfileCard from "../components/cards/TeamProfileCard";

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
        <TeamProfileCard
          teamData={teamData}
          selectedSeason={selectedSeason}
          ratingLabel={ratingLabel}
          ratingValueDisplay={ratingValueDisplay}
        />

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
