import { motion } from "framer-motion";

const StatsCard = ({ title, value, icon: Icon, color, iconColor }) => (
  <motion.div
    className={`bg-neutral rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className="text-gray-100 text-md mb-1 font-bold">{title}</p>
        <h3 className="text-white text-3xl font-bold">{value}</h3>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-300 opacity-25" />
    <div className={`absolute -bottom-4 -right-0 opacity-60 ${iconColor}`}>
      <Icon className="h-32 w-32" />
    </div>
  </motion.div>
);

export default StatsCard;