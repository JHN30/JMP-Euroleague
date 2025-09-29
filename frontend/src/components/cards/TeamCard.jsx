import { motion } from "framer-motion";

const TeamCard = ({ team }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.005,
        boxShadow: "0 8px 25px rgba(251, 146, 60, 0.3), 0 0 20px rgba(251, 146, 60, 0.2)",
      }}
      transition={{ duration: 0.3 }}
      className="card bg-neutral card-md h-full relative overflow-hidden group hover:shadow-xl transition-all duration-300"
    >
      {/* Subtle glow overlay that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-200/5 via-transparent to-orange-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

      {/* Sparkling effect - small animated dots */}
      <div className="absolute top-2 right-2 w-1 h-1 bg-orange-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-pulse" />
      <div className="absolute top-4 right-4 w-0.5 h-0.5 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-200 group-hover:animate-ping" />
      <div className="absolute top-3 right-6 w-0.5 h-0.5 bg-orange-200 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-800 delay-400 group-hover:animate-pulse" />

      <div className="card-body bg-orange-400 p-4 items-center justify-center rounded-t-md relative z-10">
        <h2 className="flex items-center justify-center text-white text-base font-bold">{team.name}</h2>
      </div>
      <figure className="mt-2 mb-2 relative z-10">
        <img
          src={team.logoImg}
          className="flex items-center justify-center object-contain w-24 h-24 transition-all duration-300 group-hover:brightness-110"
          alt={`${team.name} logo`}
        />
      </figure>
    </motion.div>
  );
};

export default TeamCard;
