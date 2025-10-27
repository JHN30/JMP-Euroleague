const Input = ({ icon: Icon, className = "", wrapperClassName = "", ...props }) => {
  return (
    <div className={`relative mb-6 ${wrapperClassName}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="size-5 text-orange-400" />
      </div>
      <input
        {...props}
        className={`w-full rounded-lg border border-gray-700 bg-gray-800/60 py-2 pl-10 pr-3 text-white placeholder-gray-400 transition duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 ${className}`}
      />
    </div>
  );
};

export default Input;
