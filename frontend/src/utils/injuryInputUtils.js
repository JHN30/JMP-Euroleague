const DIGIT_PATTERN = /^[0-5]$/;

export const normalizeInjuryInputValue = (value = "") => {
  if (value === "") return "";

  const digitsOnly = String(value).replace(/\D/g, "");
  if (!digitsOnly.length) return null;

  const lastDigit = digitsOnly.charAt(digitsOnly.length - 1);
  return DIGIT_PATTERN.test(lastDigit) ? lastDigit : null;
};

export const selectInputText = (event) => {
  if (event?.target?.select) {
    event.target.select();
  }
};
