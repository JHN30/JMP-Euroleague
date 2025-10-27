import { motion } from "framer-motion";

const TeamCard = ({ team }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.01,
        boxShadow: "0 10px 30px rgba(251, 146, 60, 0.35), 0 0 30px rgba(251, 146, 60, 0.2)",
      }}
      transition={{ duration: 0.3 }}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-[1px] shadow-xl shadow-black/30"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/20 via-transparent to-amber-400/20 opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="card card-md relative h-full overflow-hidden rounded-[1.45rem] bg-neutral">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.45rem] border border-transparent transition-all duration-500 group-hover:border-orange-300/40" />
        <div className="pointer-events-none absolute inset-0 translate-x-[-120%] skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-900 group-hover:translate-x-[120%] group-hover:opacity-100" />

        <div className="card-body relative z-10 items-center justify-center rounded-t-[1.2rem] bg-gradient-to-br from-orange-500 via-orange-500 to-amber-400 p-4 text-center">
          <h2 className="flex items-center justify-center font-black uppercase tracking-[0.45em] text-[0.65rem] text-white drop-shadow-md">
            {team.name}
          </h2>
        </div>

        <figure className="relative z-10 mb-3 mt-3">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2 shadow-inner shadow-black/40 transition duration-300 group-hover:border-orange-300/60 group-hover:bg-white/10">
            <img
              src={team.logoImg}
              className="h-full w-full object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-125"
              alt={`${team.name} logo`}
            />
          </div>
        </figure>
      </div>
    </motion.div>
  );
};

export default TeamCard;
