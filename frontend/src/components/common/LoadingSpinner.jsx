const sizeMap = {
  xs: "h-10 w-10",
  sm: "h-12 w-12",
  md: "h-16 w-16",
  lg: "h-20 w-20",
  xl: "h-24 w-24",
};

const LoadingSpinner = ({ size = "md", message = "Loading the latest data..." }) => {
  const spinnerSize = sizeMap[size] || sizeMap.md;

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-4 rounded-2xl border border-primary/10 bg-base-100/80 px-6 py-8 text-center shadow-xl backdrop-blur-sm">
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

      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">Preparing Content</span>
        <p className="text-sm text-base-content/70">{message}</p>
      </div>

      <span className="sr-only" role="status" aria-live="polite">
        {message}
      </span>
    </div>
  );
};

export default LoadingSpinner;
