import { motion } from "framer-motion";

const FormCard = ({ value, color, gridColumns }) => {
  const arr = Array.isArray(value) ? value : [];
  const count = Number.isFinite(Number(gridColumns)) ? Number(gridColumns) : 0;

  const start = Math.max(arr.length - count, 0);
  const slice = arr.slice(start, arr.length);

  return (
    <motion.div
      className={`bg-neutral rounded-b-lg mb-4 shadow-lg overflow-hidden w-full relative`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Array of results */}
      <div className={`flex px-4 py-2 gap-2 ${color} justify-evenly`}>
        {arr.length === 0 ? (
          <span className="text-white">No recent results</span>
        ) : (
          slice.map((result, idx) => (
            <h3
              key={idx}
              className={`text-2xl lg:text-4xl font-bold ${result === "W" ? "text-green-600" : "text-red-600"} `}
            >
              {result}
            </h3>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default FormCard;
