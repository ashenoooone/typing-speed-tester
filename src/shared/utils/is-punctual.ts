const pattern = /^[.,!?;:]$/;

export const isPunctual = (val: string) => {
  return pattern.test(val);
};
