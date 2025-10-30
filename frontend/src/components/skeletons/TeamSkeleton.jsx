const TeamSkeleton = () => {
  return (
    <tr className="border-b border-white/5 text-xs transition-colors last:border-0 md:text-sm">
      {/* Position */}
      <td className="whitespace-nowrap px-2 py-3 text-center">
        <div className="mx-auto h-4 w-6 rounded-full bg-orange-300/20 animate-pulse" />
      </td>
      {/* Team name & logo */}
      <td className="px-1 py-2">
        <div className="flex items-center gap-2 px-1.5 py-1">
          <div className="h-6 w-6 sm:h-11 sm:w-11 rounded-lg bg-white/10 animate-pulse" />
          <div className="hidden md:flex flex-col gap-1">
            <div className="h-4 w-24 rounded-full bg-white/10 animate-pulse" />
          </div>
        </div>
      </td>
      {/* Wins */}
      <td className="px-1 py-3 text-center">
        <div className="mx-auto h-4 w-4 rounded-full bg-green-400/20 animate-pulse" />
      </td>
      {/* Losses */}
      <td className="px-1 py-3 text-center">
        <div className="mx-auto h-4 w-4 rounded-full bg-red-400/20 animate-pulse" />
      </td>
      {/* Win% - hidden on small/medium screens */}
      <td className="hidden px-1 py-3 text-center lg:table-cell">
        <div className="mx-auto h-4 w-12 rounded-full bg-white/10 animate-pulse" />
      </td>
      {/* PTS+ - hidden on small/medium screens */}
      <td className="hidden px-1 py-3 text-center lg:table-cell">
        <div className="mx-auto h-4 w-10 rounded-full bg-white/10 animate-pulse" />
      </td>
      {/* PTS- - hidden on small/medium screens */}
      <td className="hidden px-1 py-3 text-center lg:table-cell">
        <div className="mx-auto h-4 w-10 rounded-full bg-white/10 animate-pulse" />
      </td>
      {/* +/- - hidden on small/medium screens */}
      <td className="hidden px-1 py-3 text-center lg:table-cell">
        <div className="mx-auto h-4 w-10 rounded-full bg-white/10 animate-pulse" />
      </td>
      {/* Form - shows compact on mobile, full on desktop */}
      <td className="px-1 py-3 text-center">
        {/* Mobile: compact form display */}
        <div className="mx-auto h-4 w-10 rounded-full bg-white/10 animate-pulse lg:hidden" />
        {/* Desktop: individual game circles */}
        <div className="hidden justify-center gap-1 lg:flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-6 w-6 rounded-full bg-white/10 animate-pulse" />
          ))}
        </div>
      </td>
      {/* JMP Rating */}
      <td className="px-1 py-3 text-center">
        <div className="mx-auto h-4 w-8 rounded-full bg-orange-400/20 animate-pulse" />
      </td>
    </tr>
  );
};

export default TeamSkeleton;
