export const checkMinLength = (value?: string) => {
  if (value === undefined) return false;
  else if (`${value}`.length >= 8) return true;
  return false;
};

export const checkMaxLength = (value?: string) => {
  if (value === undefined) return false;
  else if (`${value}`.length <= 20 && `${value}`.length >= 8) return true;
  return false;
};

export const checkLowerCase = (value?: string) => {
  if (value === undefined) {
    return false;
  }
  return /^(?=.*[a-z])/.test(value);
};

export const checkUpperCase = (value?: string) => {
  if (value === undefined) {
    return false;
  }
  return /^(?=.*[A-Z])/.test(value);
};

export const checkOneDigit = (value?: string) => {
  if (value === undefined) {
    return false;
  }
  return /^(?=.*\d)/.test(value);
};

export const checkSpecialChar = (value?: string) => {
  if (value === undefined) {
    return false;
  }
  return /^(?=.*?[!#$%&*?@^-])/.test(value);
};
