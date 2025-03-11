export const getPropFromParams = <T extends Record<string, string>>(
  params: T,
  prop: keyof T,
  defaultValue = 0
): number => {
  const value = params[prop];

  if (Number.isNaN(Number(value))) {
    return defaultValue;
  }

  return Number(value);
};
