const TeamSkeleton = () => {
  return (
    <tr className="border-b-2 border-orange-400/60 h-16 animate-pulse">
      {/* Position */}
      <td className="w-auto">
        <div className="skeleton h-5 w-8 bg-orange-400/20"></div>
      </td>

      {/* Team Name with Logo */}
      <td className="w-auto">
        <div className="flex items-center gap-3">
          <div className="skeleton w-12 h-12 rounded-lg bg-base-300 flex-shrink-0"></div>
          <div className="skeleton h-5 w-40 bg-base-300"></div>
        </div>
      </td>

      {/* Wins */}
      <td className="w-auto">
        <div className="skeleton h-5 w-10 bg-green-400/20"></div>
      </td>

      {/* Losses */}
      <td className="w-auto">
        <div className="skeleton h-5 w-10 bg-red-400/20"></div>
      </td>

      {/* Win Percentage */}
      <td className="w-auto">
        <div className="skeleton h-5 w-16 bg-base-300"></div>
      </td>

      {/* Points Plus */}
      <td className="w-auto">
        <div className="skeleton h-5 w-12 bg-base-300"></div>
      </td>

      {/* Points Minus */}
      <td className="w-auto">
        <div className="skeleton h-5 w-12 bg-base-300"></div>
      </td>

      {/* Form - 5 circles */}
      <td className="w-auto">
        <div className="flex gap-1">
          <div className="skeleton w-6 h-6 rounded-full bg-base-300 flex-shrink-0"></div>
          <div className="skeleton w-6 h-6 rounded-full bg-base-300 flex-shrink-0"></div>
          <div className="skeleton w-6 h-6 rounded-full bg-base-300 flex-shrink-0"></div>
          <div className="skeleton w-6 h-6 rounded-full bg-base-300 flex-shrink-0"></div>
          <div className="skeleton w-6 h-6 rounded-full bg-base-300 flex-shrink-0"></div>
        </div>
      </td>

      {/* Rating */}
      <td className="w-auto">
        <div className="skeleton h-5 w-14 bg-orange-400/20"></div>
      </td>
    </tr>
  );
};

export default TeamSkeleton;