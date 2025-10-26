const AuthShell = ({ children, maxWidth = "max-w-3xl", className = "" }) => {
  return (
    <div
      className={`relative min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 px-4 py-16 overflow-hidden ${className}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-16 w-80 h-80 bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-8 w-96 h-96 bg-amber-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_1px,_transparent_1px)] bg-[length:120px_120px]" />
      </div>
      <div className="relative z-10 mx-auto w-full">
        <div className={`w-full ${maxWidth} mx-auto`}>{children}</div>
      </div>
    </div>
  );
};

export const authCardClass =
  "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-orange-900/20 backdrop-blur-3xl";

export default AuthShell;
