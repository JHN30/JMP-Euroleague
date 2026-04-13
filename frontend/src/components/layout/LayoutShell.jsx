const ambientGlowStyle = {
  backgroundImage: `
    radial-gradient(circle at top right, rgba(249, 115, 22, 0.16), transparent 32%),
    radial-gradient(circle at bottom left, rgba(255, 215, 0, 0.12), transparent 34%)
  `,
};

const LayoutShell = ({ children, className = "", contentClassName = "max-w-8xl", maxWidth }) => {
  const finalContentClass = maxWidth || contentClassName;

  return (
    <div
      className={`relative min-h-screen w-full bg-slate-900 px-4 py-6 sm:px-6 lg:px-8 overflow-hidden text-slate-100 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0" style={ambientGlowStyle} />
      <div className={`relative z-10 mx-auto w-full ${finalContentClass}`}>{children}</div>
    </div>
  );
};

export const layoutCardClass =
  "rounded-3xl border border-white/10 bg-slate-900/75 shadow-xl shadow-black/20 ring-1 ring-white/5";

export const authCardClass = `relative overflow-hidden ${layoutCardClass}`;

export default LayoutShell;
