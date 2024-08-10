export const generateRandomNumber = (length: number): string => {
  const _length = Math.floor(Math.random() * length) + 1; // Длина от 1 до 4
  let number = "";

  for (let i = 0; i < _length; i++) {
    number += Math.floor(Math.random() * 10);
  }

  return number;
};
