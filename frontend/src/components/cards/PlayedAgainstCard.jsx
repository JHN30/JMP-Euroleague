import { motion } from "framer-motion";

const PlayedAgainstCard = ({ teamName, opposition, homeCourt, result }) => (
  <motion.div
    className="bg-neutral border-b-2 border-r-2 border-l-2 border-amber-400 rounded-b-lg p-2 shadow-lg overflow-hidden w-full relative"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex flex-col w-full gap-2">
      {opposition.length === 0 ? (
        <span className="text-white">No recent results</span>
      ) : (
        opposition.map((team, idx) => (
          <div
            className="flex flex-col bg-base-100 items-center justify-center border-2 border-amber-400 rounded-2xl p-2"
            key={idx}
          >
            <p className="text-gray-100 text-bold mb-2">Round {opposition.length - idx}</p>
            {/* Matchup Display */}
            <div className="flex flex-row w-full justify-between items-center gap-1 lg:gap-4">
              {/* Home Team */}
              <div className="flex-1 flex justify-end">
                <p
                  className={`text-sm md:text-lg lg:text-2xl font-bold ${
                    homeCourt[idx] === "H" ? "text-white" : "text-gray-400"
                  } text-right`}
                >
                  {homeCourt[idx] === "H" ? teamName : team}
                </p>
              </div>
              {/* Div for results */}
              <div className="flex flex-row mx-4 justify-center items-center">
                {/* Home Team Result */}
                <p
                  className={`flex items-center justify-center size-6 md:size-8 lg:size-10 text-sm md:text-lg lg:text-2xl font-bold text-white rounded-md ${
                    homeCourt[idx] === "H"
                      ? result[idx] === "W"
                        ? "bg-green-600"
                        : "bg-red-600"
                      : result[idx] === "W"
                      ? "bg-red-600"
                      : "bg-green-600"
                  }`}
                >
                  {homeCourt[idx] === "H" ? result[idx] : result[idx] === "W" ? "L" : "W"}
                </p>
                {/* Away Team Result */}
                <p
                  className={`flex items-center justify-center size-6 md:size-8 lg:size-10 text-sm md:text-lg lg:text-2xl font-bold text-white rounded-md ${
                    homeCourt[idx] === "A"
                      ? result[idx] === "W"
                        ? "bg-green-600"
                        : "bg-red-600"
                      : result[idx] === "W"
                      ? "bg-red-600"
                      : "bg-green-600"
                  }`}
                >
                  {homeCourt[idx] === "A" ? result[idx] : result[idx] === "W" ? "L" : "W"}
                </p>
              </div>
              {/* Away Team */}
              <div className="flex-1 flex justify-start">
                <p
                  key={idx}
                  className={` text-sm md:text-lg lg:text-2xl font-bold ${
                    homeCourt[idx] === "A" ? "text-white" : "text-gray-400"
                  }`}
                >
                  {homeCourt[idx] === "A" ? teamName : team}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </motion.div>
);

export default PlayedAgainstCard;