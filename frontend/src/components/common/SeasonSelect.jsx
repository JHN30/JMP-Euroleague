const DEFAULT_SEASONS = [2024, 2025];

const baseClassName =
  "select select-bordered w-full max-w-xs focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200";

const SeasonSelect = ({
  id = "season-select",
  name,
  value,
  onChange,
  seasons = DEFAULT_SEASONS,
  placeholder = "Select Season",
  className = "",
  ...rest
}) => {
  const combinedClassName = `${baseClassName}${className ? ` ${className}` : ""}`;

  return (
    <select id={id} name={name || id} value={value} onChange={onChange} className={combinedClassName} {...rest}>
      <option disabled value="">
        {placeholder}
      </option>
      {seasons.map((season) => (
        <option key={season} value={season}>
          {season}
        </option>
      ))}
    </select>
  );
};

export default SeasonSelect;
