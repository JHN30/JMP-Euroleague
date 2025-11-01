import { motion } from "motion/react";
import logo from "../../../assets/Logo.png";

const FallbackComponent = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-300">
    {/* Animated background blobs */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl"
      />
    </div>

    {/* Main content */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 flex flex-col items-center gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12"
    >
      {/* Logo or Brand */}
      <motion.div
        animate={{
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white/10 p-3 shadow-lg backdrop-blur-sm"
      >
        <img src={logo} alt="JMP Logo" className="h-full w-full object-contain" />
      </motion.div>

      {/* Progress Bar Loading Animation */}
      <div className="w-64 space-y-3">
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500"
          />
        </div>
      </div>

      {/* Loading Text */}
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-2"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-200">Loading Page</p>
        <p className="text-xs text-gray-400">Fetching content, just a moment...</p>
      </motion.div>

      {/* Pulsing Circles Animation (Different from spinner) */}
      <div className="flex gap-3">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
            className="h-3 w-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-400"
          />
        ))}
      </div>
    </motion.div>
  </div>
);

export default FallbackComponent;
