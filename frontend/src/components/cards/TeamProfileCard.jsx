// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaBasketball } from "react-icons/fa6";
import { layoutCardClass } from "../layout/LayoutShell";

const TeamProfileCard = ({ teamData }) => {
  return (
    <motion.section
      className={`${layoutCardClass} relative h-full overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <FaBasketball
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] text-orange-200/2 xl:h-auto xl:w-full"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5 px-5 py-6 text-center sm:px-6 sm:py-7">
        <div className="flex flex-col items-center gap-5 sm:flex-col sm:justify-center sm:gap-6">
          <div className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-2xl border border-orange-300/20 bg-slate-950/70 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.24)] sm:h-48 sm:w-48">
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

          <div className="min-w-0 text-center">
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-[2.1rem]">{teamData.name || "-"}</h2>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TeamProfileCard;
