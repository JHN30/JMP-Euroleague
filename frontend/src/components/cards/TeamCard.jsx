import { motion } from "framer-motion";

const TeamCard = ({ team }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.005,
        boxShadow: "0 8px 25px rgba(251, 146, 60, 0.3), 0 0 20px rgba(251, 146, 60, 0.2)",
      }}
      transition={{ duration: 0.3 }}
      className="group card card-md relative h-full overflow-hidden bg-neutral transition-all duration-300 hover:shadow-2xl"
    >
      {/* Animated border halo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl border border-transparent transition-all duration-500 group-hover:border-orange-300/40" />

      {/* Shimmer sweep */}
      <div className="pointer-events-none absolute inset-0 translate-x-[-120%] skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-900 group-hover:translate-x-[120%] group-hover:opacity-100" />

      <div className="card-body relative z-10 items-center justify-center rounded-t-md bg-gradient-to-br from-orange-400 via-orange-500 to-orange-400 p-4 text-center">
        <h2 className="flex items-center justify-center text-xs font-bold uppercase tracking-tight text-white drop-shadow-md">
          {team.name}
        </h2>
      </div>
      <figure className="relative z-10 mb-2 mt-2">
        <img
          src={team.logoImg}
          className="mx-auto flex h-24 w-24 object-contain p-1 items-center justify-center shadow-inner transition-all duration-300 group-hover:scale-105 group-hover:brightness-125"
          alt={`${team.name} logo`}
        />
      </figure>
    </motion.div>
  );
};

export default TeamCard;
