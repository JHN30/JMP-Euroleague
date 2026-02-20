const Input = ({ icon: Icon, className = "", wrapperClassName = "", ...props }) => {
  return (
    <div className={`relative mb-6 ${wrapperClassName}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="size-5 text-orange-400" />
      </div>
      <input
        {...props}
        className={`w-full appearance-none rounded-xl border border-white/10 bg-slate-800/50 py-3 pl-10 pr-4 text-sm font-medium text-slate-200 placeholder-slate-400 shadow-sm outline-none transition-all duration-200 hover:border-white/20 hover:bg-slate-800/80 focus:border-orange-400 focus:bg-slate-800 focus:ring-4 focus:ring-orange-400/10 ${className}`}
      />
    </div>
  );
};

export default Input;
