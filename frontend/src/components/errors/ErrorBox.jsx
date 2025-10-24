const ErrorBox = ({ error }) => {
  const message = typeof error === "string" ? error : error?.message || "Something went wrong. Please try again.";

  return (
    <div
      role="alert"
      className="relative mx-auto flex w-full max-w-lg overflow-hidden rounded-2xl border border-error/20 bg-base-100/90 shadow-xl backdrop-blur-sm"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-error to-orange-500" aria-hidden="true" />

      <div className="flex w-full items-start gap-4 px-6 py-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-error/10 text-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-error">Error</span>
          <p className="text-sm leading-relaxed text-base-content/80">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorBox;
