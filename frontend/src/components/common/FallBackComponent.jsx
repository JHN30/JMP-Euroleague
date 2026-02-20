import logo from "../../../assets/Logo.png";

const FallbackComponent = () => (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-900 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] right-[-10%] h-[50vw] w-[50vw] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[50vw] w-[50vw] rounded-full bg-slate-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.04)_1px,_transparent_1px)] bg-[length:64px_64px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 rounded-3xl border border-white/10 bg-slate-800/30 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
        {/* Logo or Brand */}
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white/5 p-3 shadow-lg border border-white/5 backdrop-blur-sm">
          <img src={logo} alt="JMP Logo" className="h-full w-full object-contain" />
        </div>

        {/* Progress Bar Loading Animation */}
        <progress className="progress progress-primary w-56"></progress>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">Loading Page</p>
        </div>
      </div>
    </div>
  );

export default FallbackComponent;
