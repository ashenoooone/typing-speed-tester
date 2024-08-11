const parrern = /^[а-яёА-ЯЁ]$/;

export const isCyrrilic = (val: string) => {
  return parrern.test(val);
};
