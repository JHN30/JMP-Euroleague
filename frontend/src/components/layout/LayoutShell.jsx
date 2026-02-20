const LayoutShell = ({ children, className = "", contentClassName = "max-w-8xl", maxWidth }) => {
  // Support both contentClassName (from PageShell) and maxWidth (from AuthShell)
  const finalContentClass = maxWidth || contentClassName;

  return (
    <div
      className={`relative min-h-screen w-full bg-slate-900 px-4 py-6 sm:px-6 lg:px-8 overflow-hidden text-slate-100 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] right-[-10%] h-[50vw] w-[50vw] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[50vw] w-[50vw] rounded-full bg-slate-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.04)_1px,_transparent_1px)] bg-[length:64px_64px]" />
      </div>
      <div className={`relative z-10 mx-auto w-full ${finalContentClass}`}>{children}</div>
    </div>
  );
};

export const layoutCardClass =
  "rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/20 backdrop-blur-xl";

// Legacy exports for backwards compatibility during transition
export const authCardClass = `relative overflow-hidden ${layoutCardClass}`;
export const pageCardClass = layoutCardClass;

export default LayoutShell;
