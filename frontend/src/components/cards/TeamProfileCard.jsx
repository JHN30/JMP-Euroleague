// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { SlGraph } from "react-icons/sl";
import { layoutCardClass } from "../layout/LayoutShell";

const TeamProfileCard = ({ teamData, ratingLabel, ratingValueDisplay }) => {
  return (
    <motion.section
      className={`${layoutCardClass} overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex flex-col gap-6 px-5 py-5 sm:px-6 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative z-10 flex flex-1 flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-400/90">Team profile</p>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{teamData.name || "-"}</h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">Record</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {Number(teamData.wins ?? 0)} - {Number(teamData.losses ?? 0)}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">Win %</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {teamData.winPercentage ? `${teamData.winPercentage.toFixed(2)}%` : "0%"}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-orange-300/40 bg-orange-500/15 px-4 py-3 text-sm font-semibold text-orange-100">
              <SlGraph className="h-4 w-4" />
              <span>
                {ratingLabel}: <span className="text-white">{ratingValueDisplay}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex justify-center lg:justify-end">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-3xl border border-white/10 bg-slate-900/80 p-5 sm:h-48 sm:w-48">
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
  );
};

export default TeamProfileCard;
