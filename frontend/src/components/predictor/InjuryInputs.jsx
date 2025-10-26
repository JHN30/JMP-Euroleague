import { numberInputFieldClass } from "./predictorClasses";
import { normalizeInjuryInputValue, selectInputText } from "../../utils/injuryInputUtils";

const InjuryInputs = ({ homeInjuries, awayInjuries, onHomeChange, onAwayChange }) => {
  const handleHomeChange = (event) => {
    const normalizedValue = normalizeInjuryInputValue(event.target.value);
    if (normalizedValue === null) return;
    onHomeChange(normalizedValue);
  };

  const handleAwayChange = (event) => {
    const normalizedValue = normalizeInjuryInputValue(event.target.value);
    if (normalizedValue === null) return;
    onAwayChange(normalizedValue);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="home-injuries" className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-100">
            Home injuries
          </label>
          <span className="text-xs text-gray-400">0-5 players</span>
        </div>
        <input
          type="number"
          id="home-injuries"
          min={0}
          max={5}
          step={1}
          inputMode="numeric"
          placeholder="0"
          className={numberInputFieldClass}
          onChange={handleHomeChange}
          onFocus={selectInputText}
          value={homeInjuries}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="away-injuries" className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-100">
            Away injuries
          </label>
          <span className="text-xs text-gray-400">0-5 players</span>
        </div>
        <input
          type="number"
          id="away-injuries"
          min={0}
          max={5}
          step={1}
          inputMode="numeric"
          placeholder="0"
          className={numberInputFieldClass}
          onChange={handleAwayChange}
          onFocus={selectInputText}
          value={awayInjuries}
        />
      </div>
    </div>
  );
};

export default InjuryInputs;
