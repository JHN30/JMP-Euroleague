const TeamSkeleton = () => {
  return (
    <div className="border-b-2 border-orange-400 py-4">
      <div className="flex items-center gap-2">
        <div className="skeleton h-4 w-8"></div>
        <div className="flex items-center space-x-3">
          <div className="skeleton h-8 w-8 rounded-full"></div>
          <div className="skeleton h-4 w-32"></div>
        </div>
        <div className="flex-1 flex justify-between px-4">
          <div className="skeleton h-4 w-8"></div>
          <div className="skeleton h-4 w-8"></div>
          <div className="skeleton h-4 w-12"></div>
          <div className="flex gap-1">
            <div className="skeleton h-4 w-6"></div>
            <div className="skeleton h-4 w-6"></div>
            <div className="skeleton h-4 w-6"></div>
            <div className="skeleton h-4 w-6"></div>
            <div className="skeleton h-4 w-6"></div>
          </div>
          <div className="skeleton h-4 w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default TeamSkeleton;