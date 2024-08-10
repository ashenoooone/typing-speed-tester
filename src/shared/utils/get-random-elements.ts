export const getRandomElements = <T>(array: T[], count: number) => {
  /**
   * получает count рандомных элементов из массива
   */
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
