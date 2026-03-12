import { HiChevronDown } from "react-icons/hi";

const DEFAULT_SEASONS = [2024, 2025];

const SeasonSelect = ({
  id = "season-select",
  name,
  value,
  onChange,
  seasons = DEFAULT_SEASONS,
  placeholder = "Select Season",
  className = "",
}) => {
  const selectClass =
    "appearance-none w-full rounded-lg border border-white/10 bg-slate-800/50 px-5 py-2 pr-11 text-sm font-medium text-slate-200 shadow-sm outline-none transition-all duration-200 hover:border-white/20 hover:bg-slate-800/80 focus:border-orange-400 focus:bg-slate-800 focus:ring-4 focus:ring-orange-400/10";

  return (
    <div className={`relative w-full ${className}`}>
      <select
        id={id}
        name={name || id}
        className={selectClass}
        value={value ?? ""}
        onChange={onChange}
      >
        <option disabled value="" className="bg-slate-800 text-slate-400">
          {placeholder}
        </option>
        {seasons.map((season) => (
          <option key={season} value={season.toString()} className="bg-slate-800 text-slate-200">
            {season}
          </option>
        ))}
      </select>
      <HiChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
    </div>
  );
};

export default SeasonSelect;
