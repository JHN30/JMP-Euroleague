import { motion } from "framer-motion";
import { SlGraph } from "react-icons/sl";
import { pageCardClass } from "../layout/PageShell";

const TeamProfileCard = ({ teamData, selectedSeason, ratingLabel, ratingValueDisplay }) => {
  return (
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
            <div className="rounded-2xl text-center border border-white/10 bg-white/10 px-4 py-3 shadow-inner shadow-black/40">
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-orange-200/80">Record</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {Number(teamData.wins ?? 0)}&nbsp;-&nbsp;{Number(teamData.losses ?? 0)}
              </p>
            </div>
            <div className="rounded-2xl text-center border border-white/10 bg-white/10 px-4 py-3 shadow-inner shadow-black/40">
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
  );
};

export default TeamProfileCard;
