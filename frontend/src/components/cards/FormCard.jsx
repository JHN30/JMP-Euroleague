import { motion } from "framer-motion";

const FormCard = ({ value, color, gridColumns }) => (
  <motion.div
    className={`bg-neutral rounded-b-lg mb-4 shadow-lg overflow-hidden w-full relative`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Array of results */}
    <div className={`flex p-2 gap-2 ${color} justify-between`}>
      {value.length === 0 ? (
        <span className="text-white">No recent results</span>
      ) : (
        value.slice(value.length - gridColumns, value.length).map((result, idx) => (
          <h3 key={idx} className={`text-2xl lg:text-4xl font-bold ${result === "W" ? "text-green-600" : "text-red-600"} `}>
            {result}
          </h3>
        ))
      )}
    </div>
  </motion.div>
);

export default FormCard;