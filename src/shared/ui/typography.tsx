import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "@/shared/utils/cn";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      "custom-headline": "text-custom-headline leading-custom-headline", // 48px 56px
      "title-3": "text-title-3 leading-title-3", // 16px 24px
      h1: "text-h1 leading-h1", // 96px 112px
      h2: "text-h2 leading-h2", // 60px 72px
      h3: "text-h3 leading-h3", // 48px 56px
      h4: "text-h4 leading-h4", // 34px 36px
      h5: "text-h5 leading-h5", // 24px 32px
      h6: "text-h6 leading-h6", // 20px 24px
      "subtitle-1": "text-subtitle-1 leading-subtitle-1", // 16px 24px
      "subtitle-2": "text-subtitle-2 leading-subtitle-2", // 14px 24px
      "body-1": "text-body-1 leading-body-1", // 16px 24px
      "body-2": "text-body-2 leading-body-2", // 14px 20px
      button: "text-button leading-button", // 14px 20px
      caption: "text-caption leading-caption", // 12px 16px
      overline: "text-overline leading-overline", // 12px 32px
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

export const Typography = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, variant, tag, ...props }, ref) => {
    const Comp = tag || "p";
    return (
      <Comp
        className={cn("", typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Typography.displayName = "H1";
