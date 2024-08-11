const pattern = /^[0-9]$/;

export const isNumeric = (val: string) => {
  return pattern.test(val);
};
