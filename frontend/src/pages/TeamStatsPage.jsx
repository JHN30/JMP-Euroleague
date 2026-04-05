import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import ErrorBox from "../components/errors/ErrorBox";
import StatsCard from "../components/cards/StatsCard";
import FormCard from "../components/cards/FormCard";
import PlayedAgainstCard from "../components/cards/PlayedAgainstCard";
import LayoutShell, { layoutCardClass } from "../components/layout/LayoutShell";
import TeamStatsSkeleton from "../components/skeletons/TeamStatsSkeleton";
import TeamProfileCard from "../components/cards/TeamProfileCard";
import RatingGraphCard from "../components/cards/RatingGraphCard";

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
  const ratingLabel = "JMP Rating";
  const rawRatingValue = Number(teamData.rating);
  const ratingValueDisplay = Number.isFinite(rawRatingValue) ? rawRatingValue.toFixed(0) : "0";
  const { oppositionArray, homeCourtArray, resultArray, pointsForArray, pointsAgainstArray } = useMemo(
    () => ({
      oppositionArray: Array.isArray(teamData.playedAgainst) ? teamData.playedAgainst.slice().reverse() : [],
      homeCourtArray: Array.isArray(teamData.homeGround) ? teamData.homeGround.slice().reverse() : [],
      resultArray: Array.isArray(teamData.form) ? teamData.form.slice().reverse() : [],
      pointsForArray: Array.isArray(teamData.pointsPlusArray) ? teamData.pointsPlusArray.slice().reverse() : [],
      pointsAgainstArray: Array.isArray(teamData.pointsMinusArray) ? teamData.pointsMinusArray.slice().reverse() : [],
    }),
    [teamData.form, teamData.homeGround, teamData.playedAgainst, teamData.pointsMinusArray, teamData.pointsPlusArray]
  );

  if (loadingTeams) {
    return (
      <LayoutShell>
        <TeamStatsSkeleton />
      </LayoutShell>
    );
  }

  if (errorTeams) {
    return (
      <div className="flex h-full w-full items-center justify-center px-5 py-5 sm:px-6 sm:py-6">
        <ErrorBox error={errorTeams} />
      </div>
    );
  }

  return (
    <LayoutShell>
      <div className="flex flex-col gap-6 pt-4 text-white">
        <header className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-400/90">JMP Team Stats</p>
          <h1 className="text-3xl font-bold leading-tight text-slate-100">{teamData.name || "Team Profile"}</h1>
        </header>

        <TeamProfileCard teamData={teamData} ratingLabel={ratingLabel} ratingValueDisplay={ratingValueDisplay} />

        {/* Stats Section */}
        <section className={`${layoutCardClass} px-5 py-5 sm:px-6 sm:py-6`}>
          <div className="flex flex-col gap-4">
            <h2 className="mt-2 text-2xl font-semibold text-white border-b border-white/10 pb-6">Stats</h2>
            <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
              <StatsCard
                title="Wins"
                value={teamData.wins}
                icon={FaCheckDouble}
                iconColor="text-emerald-200"
                accent="bg-emerald-500/15"
              />
              <StatsCard
                title="Losses"
                value={teamData.losses}
                icon={HiOutlineX}
                iconColor="text-rose-200"
                accent="bg-rose-500/15"
              />
              <StatsCard
                title="Win Percentage"
                value={teamData.winPercentage ? `${teamData.winPercentage.toFixed(2)}%` : "0%"}
                icon={FaPercentage}
                iconColor="text-amber-200"
                accent="bg-amber-500/15"
              />
              <StatsCard
                title="PTS+"
                value={teamData.pointsPlus}
                icon={FaBasketball}
                iconColor="text-sky-200"
                accent="bg-sky-500/15"
              />
              <StatsCard
                title="PTS-"
                value={teamData.pointsMinus}
                icon={FaBasketball}
                iconColor="text-indigo-200"
                accent="bg-indigo-500/15"
              />
              <StatsCard
                title={ratingLabel}
                value={ratingValueDisplay}
                icon={SlGraph}
                iconColor="text-orange-200"
                accent="bg-orange-500/15"
              />
            </div>
          </div>
        </section>

        {/* Rating Graph Section */}
        <section className={`${layoutCardClass} px-3 py-4 sm:px-6 sm:py-6`}>
          <div className="flex flex-col gap-4">
            <h2 className="mt-2 text-2xl font-semibold text-white border-b border-white/10 pb-6">Rating Graph</h2>
            <RatingGraphCard ratingHistory={teamData.ratingArray} teamName={teamData.name} />
          </div>
        </section>

        {/* Form Section */}
        <section className={`${layoutCardClass} overflow-hidden`}>
          <div className="flex flex-col gap-5 px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="mt-2 text-2xl font-semibold text-white">Form</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Last 5 games", value: 5 },
                  { label: "Last 10 games", value: 10 },
                ].map((option) => {
                  const isActive = gamesToShow === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setGamesToShow(option.value)}
                      className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                        isActive
                          ? "border-orange-400/70 bg-orange-500/20 text-orange-100"
                          : "border-white/10 bg-white/5 text-gray-200 hover:border-orange-300/50 hover:text-orange-100"
                      }`}
                    >
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <FormCard value={Array.isArray(teamData.form) ? teamData.form : []} gridColumns={gamesToShow} />
          </div>
        </section>

        {/* Played Against Section */}
        <section className={`${layoutCardClass} overflow-hidden`}>
          <div className="flex flex-col gap-5 px-5 py-5 sm:px-6 sm:py-6">
            <div className="border-b border-white/10 pb-6">
              <h2 className="mt-2 text-2xl font-semibold text-white">Rounds</h2>
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
        </section>
      </div>
    </LayoutShell>
  );
};

export default TeamStatsPage;
