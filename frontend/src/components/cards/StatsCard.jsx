import { motion } from "framer-motion";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "",
  iconColor = "text-white/20",
  accent = "bg-orange-500/30",
}) => (
  <motion.div
    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-black/40 backdrop-blur-xl ${color}`}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    {/* Subtle glow + accent */}
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_60%)] opacity-70" />
      <div className={`absolute -top-16 right-0 h-32 w-32 rounded-full blur-[110px] ${accent}`} />
      <div className="absolute -bottom-20 left-6 h-24 w-24 rounded-full bg-white/15 blur-[90px]" />
    </div>

    <div className="relative z-10 flex items-start justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-300/80">{title}</p>
        <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{value}</h3>
      </div>
    </div>

    {/* Icon watermark */}
    <div className={`absolute -bottom-6 -right-4 opacity-30 ${iconColor} select-none pointer-events-none`}>
      <Icon className="h-28 w-28" />
    </div>
  </motion.div>
);

export default StatsCard;
