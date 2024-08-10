import { extendTailwindMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

// необходимо для того чтобы кастрмные классы из конфига корректно мерджились
const customTwMerge = extendTailwindMerge({
  // Override default config elements (we'll skip this part)
  override: {},
  // Extend values from the default config
  extend: {
    // Extend theme values
    classGroups: {
      leading: [
        "leading-custom-headline",
        "leading-title-3",
        "leading-h1",
        "leading-h2",
        "leading-h3",
        "leading-h4",
        "leading-h5",
        "leading-h6",
        "leading-subtitle-1",
        "leading-subtitle-2",
        "leading-body-1",
        "leading-body-2",
        "leading-button",
        "leading-caption",
        "leading-overline",
      ],
      "font-size": [
        "text-custom-headline",
        "text-title-3",
        "text-h1",
        "text-h2",
        "text-h3",
        "text-h4",
        "text-h5",
        "text-h6",
        "text-subtitle-1",
        "text-subtitle-2",
        "text-body-1",
        "text-body-2",
        "text-button",
        "text-caption",
        "text-overline",
      ],
      "text-color": [
        "text-yellow",
        "text-green",
        "text-red",
        "text-text-primary",
        "text-text-secondary",
        "text-text-tertiary",
        "text-text-accent",
        "text-text-success",
        "text-text-error",
      ],
    },
    // Additional conflicts across class groups
    conflictingClassGroups: {},
    // Conflicts between postfix modifiers and class groups
    conflictingClassGroupModifiers: {},
  },
});
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
