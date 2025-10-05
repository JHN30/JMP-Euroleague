import { motion } from "framer-motion";

const StatsCard = ({ title, value, icon: Icon, color = "bg-neutral", iconColor = "text-white/20" }) => (
  <motion.div
    className={`relative rounded-lg p-6 shadow-lg overflow-hidden isolate ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Decorative gradient overlay (behind content) */}
    <div className="absolute inset-0 -z-10 pointer-events-none opacity-30 bg-gradient-to-br from-orange-500 to-amber-300 mix-blend-overlay" />

    <div className="flex justify-between items-center relative z-10">
      <div>
        <p className="text-gray-100 text-md mb-1 font-bold tracking-wide">{title}</p>
        <h3 className="text-white text-3xl font-bold leading-tight">{value}</h3>
      </div>
    </div>

    {/* Icon watermark */}
    <div className={`absolute -bottom-4 -right-0 opacity-50 ${iconColor} select-none pointer-events-none z-0`}>
      <Icon className="h-32 w-32" />
    </div>
  </motion.div>
);

export default StatsCard;
