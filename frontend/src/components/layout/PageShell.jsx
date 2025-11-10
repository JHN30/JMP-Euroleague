const PageShell = ({ children, className = "", contentClassName = "max-w-7xl" }) => {
  return (
    <div
      className={`relative min-h-screen w-full bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 px-4 py-12 sm:px-6 lg:px-8 overflow-hidden ${className}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-24 h-96 w-96 bg-orange-500/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-12 h-[28rem] w-[28rem] bg-amber-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:140px_140px]" />
      </div>
      <div className={`relative z-10 mx-auto w-full ${contentClassName}`}>{children}</div>
    </div>
  );
};

export const pageCardClass =
  "rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl";

export default PageShell;
