const sizeMap = {
  xs: "h-10 w-10",
  sm: "h-12 w-12",
  md: "h-16 w-16",
  lg: "h-20 w-20",
  xl: "h-24 w-24",
};

const LoadingSpinner = ({ size = "md" }) => {
  const spinnerSize = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex items-center justify-center">
      <div className={`relative flex items-center justify-center ${spinnerSize}`}>
        <span
          className="pointer-events-none absolute inset-0 rounded-full border-[3px] border-base-content/10"
          aria-hidden="true"
        />
        <span
          className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-orange-400 border-r-orange-500 animate-spin"
          aria-hidden="true"
        />
        <span className="absolute inset-[30%] rounded-full bg-orange-500/20 blur-xl" aria-hidden="true" />
      </div>

      <span className="sr-only" role="status" aria-live="polite">
        Loading...
      </span>
    </div>
  );
};

export default LoadingSpinner;
