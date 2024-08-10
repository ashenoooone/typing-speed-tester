import { GameSettingsType } from "@/entities/control-panel";
import { generateText } from "./get-text";

describe("get text test", () => {
  test("first", () => {
    const settings: GameSettingsType = {
      currentGameMode: "words",
      modificators: {
        numbers: true,
        punctuation: true,
      },
      timePerGame: 15,
      wordsPerGame: 15,
    };

    const text = generateText(settings);
    console.log(text);

    expect(text.length).toEqual(settings.wordsPerGame);
  });
});
