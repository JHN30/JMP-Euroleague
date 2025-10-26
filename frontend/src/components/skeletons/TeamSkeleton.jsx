const TeamSkeleton = () => {
  return (
    <tr className="border-b border-white/5 last:border-0">
      <td className="px-4 py-4">
        <div className="h-4 w-8 rounded-full bg-white/10 animate-pulse" />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-white/10 animate-pulse" />
          <div className="h-4 w-32 rounded-full bg-white/10 animate-pulse" />
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="h-4 w-10 rounded-full bg-green-400/20 animate-pulse" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 w-10 rounded-full bg-red-400/20 animate-pulse" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 w-16 rounded-full bg-white/10 animate-pulse" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 w-14 rounded-full bg-white/10 animate-pulse" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 w-14 rounded-full bg-white/10 animate-pulse" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 w-12 rounded-full bg-white/10 animate-pulse" />
      </td>
      <td className="px-4 py-4">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-6 w-6 rounded-full bg-white/10 animate-pulse" />
          ))}
        </div>
      </td>
      <td className="px-4 py-4 text-right">
        <div className="ml-auto h-4 w-16 rounded-full bg-orange-400/20 animate-pulse" />
      </td>
    </tr>
  );
};

export default TeamSkeleton;
