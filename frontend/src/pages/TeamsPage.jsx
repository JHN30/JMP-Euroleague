import { useEffect } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import { useTeam } from "../hooks/useTeam";
import ErrorBox from "../components/errors/ErrorBox";
import TeamCardSkeleton from "../components/skeletons/TeamCardSkeleton";
import TeamCard from "../components/cards/TeamCard";
import { sortTeams } from "../utils/sortTeams";
import LayoutShell, { layoutCardClass } from "../components/layout/LayoutShell";

const teamPageLinks = [
  {
    to: "/",
    label: "EuroLeague standings",
    description: "See how every club ranks in the current table.",
  },
  {
    to: "/predictor",
    label: "Match predictor",
    description: "Use team ratings to compare a home and away matchup.",
  },
  {
    to: "/about-jmp-rating",
    label: "About JMP Rating",
    description: "Learn how team strength is summarized across the site.",
  },
];

const TeamsPage = () => {
  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const sortConfig = {
    key: "name",
  };

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const teamList = teams?.data ?? [];

  const renderContent = () => {
    if (loadingTeams) {
      return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <TeamCardSkeleton key={idx} />
          ))}
        </div>
      );
    }

    if (errorTeams) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <ErrorBox error={errorTeams} />
        </div>
      );
    }

    if (!teams?.data?.length) {
      return (
        <div className={`${layoutCardClass} flex min-h-[280px] items-center justify-center`}>
          <ErrorBox error="Team or round data is not available. Please try refreshing." />
        </div>
      );
    }

    const sortedTeams = sortTeams(teamList, { key: sortConfig.key });

    return (
      <motion.div
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {sortedTeams.map((team) => (
          <Link to={`/team-stats/${team._id}`} className="block h-full" key={team._id ?? team.name}>
            <TeamCard team={team} />
          </Link>
        ))}
      </motion.div>
    );
  };

  return (
    <LayoutShell>
      <div className="flex flex-col gap-6 pt-4 text-white">
        <header className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-400/90">JMP Teams</p>
          <h1 id="teams-directory-title" className="text-3xl font-bold leading-tight text-slate-100">
            EuroLeague Team Ratings & Club Profiles
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            Compare every EuroLeague club by record, scoring profile, recent form, and current JMP Rating.
          </p>
        </header>

        <section className={`${layoutCardClass} overflow-hidden`} aria-labelledby="teams-directory-title">
          <div className="px-5 py-5 sm:px-6 sm:py-6">{renderContent()}</div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className={`${layoutCardClass} px-5 py-5 sm:px-6 sm:py-6`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-300/90">Club comparison</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">What Each Team Profile Adds</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Team cards lead into club pages with record, scoring, form, rating history, and round-by-round context.
              That gives the standings a deeper layer when two teams have similar records but different performance
              trends.
            </p>
          </div>

          <div className={`${layoutCardClass} px-5 py-5 sm:px-6 sm:py-6`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-300/90">Rating context</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">How Team Ratings Support Predictions</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              JMP Rating gives every club a shared comparison point. The predictor uses that rating context when
              estimating matchup probabilities, while the playoff simulator uses the current standings order for
              scenario building.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3" aria-label="Related team rating pages">
          {teamPageLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`${layoutCardClass} block px-5 py-5 transition hover:border-orange-300/30 hover:bg-slate-900`}
            >
              <h2 className="text-base font-semibold text-slate-100">{link.label}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{link.description}</p>
            </Link>
          ))}
        </section>
      </div>
    </LayoutShell>
  );
};

export default TeamsPage;
