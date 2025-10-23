const ChampionDisplay = ({ champion }) => {
  if (!champion) {
    return null;
  }

  return (
    <section className="text-center" role="region" aria-labelledby="champion-title">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 rounded-2xl blur-xl"></div>
        <div className="relative border-3 border-amber-300 rounded-2xl p-6 md:p-8 shadow-2xl max-w-md mx-auto">
          <h3 id="champion-title" className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">
            Champion
          </h3>
          <div className="flex items-center gap-4 justify-center">
            <div className="flex flex-col items-center gap-2">
              {champion.logoImg ? (
                <img
                  src={champion.logoImg}
                  alt={`${champion.name || "Champion"} logo`}
                  className="w-16 h-16 md:w-20 md:h-20 object-contain filter brightness-110 drop-shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg">
                  {champion.name?.slice(0, 2)?.toUpperCase() || "??"}
                </div>
              )}
              <div className="text-lg md:text-xl font-bold text-yellow-400">
                {champion.name || "Champion"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChampionDisplay;

