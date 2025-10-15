const PredictingTeamsSkeleton = () => {
  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="card bg-base-100 shadow-2xl border border-orange-200 max-w-2xl w-full animate-pulse">
        <div className="card-body">
          <div className="skeleton h-8 w-56 bg-orange-400/30 mx-auto mb-6"></div>

          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center w-full">
            <div className="flex flex-col items-center gap-2 w-full lg:w-auto">
              <div className="skeleton h-4 w-20 bg-base-300"></div>
              <div className="skeleton h-12 w-56 bg-base-300 rounded-lg"></div>
            </div>

            <div className="flex flex-col items-center gap-2 w-full lg:w-auto">
              <div className="skeleton h-4 w-24 bg-base-300"></div>
              <div className="skeleton h-12 w-56 bg-base-300 rounded-lg"></div>
            </div>
          </div>

          <div className="skeleton h-12 w-48 bg-orange-400/30 mx-auto mt-6 rounded-lg"></div>
        </div>
      </div>

      <div className="mt-4 w-full max-w-4xl animate-pulse">
        <div className="skeleton h-7 w-64 bg-orange-400/30 mx-auto mb-4"></div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-xl border-l-4 border-l-green-400">
            <div className="card-body space-y-4">
              <div className="flex items-center gap-4">
                <div className="skeleton w-16 h-16 rounded-xl bg-base-300"></div>
                <div className="space-y-2">
                  <div className="skeleton h-5 w-32 bg-base-300"></div>
                  <div className="skeleton h-5 w-16 bg-green-400/30"></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="skeleton h-8 w-24 bg-base-300 mx-auto"></div>
                <div className="skeleton h-4 w-28 bg-base-300 mx-auto"></div>
                <div className="skeleton h-4 w-full bg-green-400/30 rounded-full"></div>
                <div className="skeleton h-5 w-32 bg-base-300 mx-auto"></div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border-l-4 border-l-blue-400">
            <div className="card-body space-y-4">
              <div className="flex items-center gap-4">
                <div className="skeleton w-16 h-16 rounded-xl bg-base-300"></div>
                <div className="space-y-2">
                  <div className="skeleton h-5 w-32 bg-base-300"></div>
                  <div className="skeleton h-5 w-16 bg-blue-400/30"></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="skeleton h-8 w-24 bg-base-300 mx-auto"></div>
                <div className="skeleton h-4 w-28 bg-base-300 mx-auto"></div>
                <div className="skeleton h-4 w-full bg-blue-400/30 rounded-full"></div>
                <div className="skeleton h-5 w-32 bg-base-300 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictingTeamsSkeleton;
