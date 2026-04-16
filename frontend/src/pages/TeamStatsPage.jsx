import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import ErrorBox from "../components/errors/ErrorBox";
import PlayedAgainstCard from "../components/cards/PlayedAgainstCard";
import LayoutShell, { layoutCardClass } from "../components/layout/LayoutShell";
import TeamStatsSkeleton from "../components/skeletons/TeamStatsSkeleton";
import TeamFormSummaryCard from "../components/cards/TeamFormSummaryCard";
import TeamProfileCard from "../components/cards/TeamProfileCard";
import RatingGraphCard from "../components/cards/RatingGraphCard";
import TeamStatsSummaryCard from "../components/cards/TeamStatsSummaryCard";

import { useTeam } from "../hooks/useTeam";

const TeamStatsPage = () => {
  const { fetchTeamById, team, loadingTeams, errorTeams } = useTeam();
  const { teamId } = useParams();

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
      <LayoutShell contentClassName="max-w-[1600px]">
        <TeamStatsSkeleton />
      </LayoutShell>
    );
  }

  if (errorTeams) {
    return (
      <div className="flex h-full w-full items-center justify-center px-4 py-4 sm:px-6 sm:py-6">
        <ErrorBox error={errorTeams} />
      </div>
    );
  }

  return (
    <LayoutShell contentClassName="max-w-[1600px]">
      <div className="flex flex-col gap-6 pt-4 text-white">
        <header className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-400/90">JMP Team Stats</p>
          <h1 className="text-3xl font-bold leading-tight text-slate-100">Season Overview</h1>
        </header>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)] xl:items-stretch">
          <TeamProfileCard teamData={teamData} />

          <div className="flex flex-col gap-6">
            <TeamStatsSummaryCard
              teamData={teamData}
              ratingLabel={ratingLabel}
              ratingValueDisplay={ratingValueDisplay}
            />
            <TeamFormSummaryCard form={teamData.form} />
          </div>
        </section>

        {/* Rating Graph Section */}
        <section className={`${layoutCardClass} px-3 py-4 sm:px-6 sm:py-6`}>
          <div className="flex flex-col gap-4">
            <h2 className="mt-2 text-2xl font-semibold text-white border-b border-white/10 pb-6">Rating Graph</h2>
            <RatingGraphCard ratingHistory={teamData.ratingArray} teamName={teamData.name} />
          </div>
        </section>

        {/* Played Against Section */}
        <section className={`${layoutCardClass} overflow-hidden`}>
          <div className="flex flex-col gap-5 px-4 py-4 sm:px-6 sm:py-6">
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
