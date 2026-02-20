import { useState, useRef, useEffect } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (season) => {
    onChange({ target: { value: season, name: name || id } });
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block w-full sm:w-auto ${className}`} ref={dropdownRef}>
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between gap-3 rounded-full border border-white/10 bg-slate-800/50 px-5 py-2 text-sm font-medium text-slate-200 shadow-sm outline-none transition-all duration-200 hover:border-white/20 hover:bg-slate-800/80 focus:border-orange-400 focus:bg-slate-800 focus:ring-4 focus:ring-orange-400/10 ${
          isOpen ? "border-orange-400 bg-slate-800 ring-4 ring-orange-400/10" : ""
        }`}
      >
        <span>{value || placeholder}</span>
        <HiChevronDown
          className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-[100] mt-2 w-full origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-slate-800/95 shadow-xl backdrop-blur-md">
          {seasons.map((season) => (
            <li
              key={season}
              onClick={() => handleSelect(season.toString())}
              className={`cursor-pointer px-5 py-3 text-sm font-medium transition-colors ${
                value === season.toString()
                  ? "bg-orange-500/10 text-orange-400"
                  : "text-slate-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              {season}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SeasonSelect;
