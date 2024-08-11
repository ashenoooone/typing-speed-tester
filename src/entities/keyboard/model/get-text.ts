import { GameSettingsType } from "@/entities/control-panel";
import WORDS from "./words_ru.json";
import { generateRandomNumber, getRandomElements } from "@/shared/utils";

const PUNCTUATIONS = [".", ",", "!", "?", ";", ":"];

export const generateText = (settings: GameSettingsType): string[] => {
  const { wordsPerGame } = settings;

  let elements;
  // Получаем случайные слова
  if (settings.currentGameMode === "words") {
    elements = getRandomElements(WORDS, wordsPerGame);
  } else {
    elements = getRandomElements(WORDS, 160);
  }
  const numberIndexes = new Set<number>();
  const punctuationIndexes = new Set<number>();

  if (settings.modificators.punctuation) {
    // Вычисляем количество знаков препинания (20% от количества слов, округление вверх)
    const punctuationCount = Math.ceil(wordsPerGame * 0.2);

    // Создаем массив индексов для добавления знаков препинания

    // Генерируем уникальные случайные индексы для добавления знаков препинания
    while (punctuationIndexes.size < punctuationCount) {
      const randomIndex = Math.floor(Math.random() * wordsPerGame);
      punctuationIndexes.add(randomIndex);
    }
  }

  if (settings.modificators.numbers) {
    const numbersCount = Math.ceil(wordsPerGame * 0.2);
    // Генерируем уникальные случайные индексы для замены на числа
    while (numberIndexes.size < numbersCount) {
      const randomIndex = Math.floor(Math.random() * wordsPerGame);
      numberIndexes.add(randomIndex);
    }
  }

  // Добавляем знаки препинания и заменяем слова на числа
  const result = elements.map((word, index) => {
    let transformedWord = word;
    if (numberIndexes.has(index)) {
      transformedWord = generateRandomNumber(4); // заменяем слово на случайное число
    }
    if (punctuationIndexes.has(index)) {
      const randomPunctuation =
        PUNCTUATIONS[Math.floor(Math.random() * PUNCTUATIONS.length)];
      transformedWord += randomPunctuation; // добавляем знак препинания к слову
    }
    return transformedWord;
  });

  return result;
};
