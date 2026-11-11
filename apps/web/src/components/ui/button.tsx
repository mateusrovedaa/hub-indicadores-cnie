import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Figma: button (15:17)
 *   emphasis: primary | secundary | tertiary  -> variant: primary | secondary | tertiary
 *   type: button circle                       -> size: icon
 *   state: hover | pressed | disabled         -> pseudo-classes CSS
 * O Figma não tem densidade; sm/lg seguem as alturas do GOV.BR DS (32/40/48).
 * Pendente: state=progress (botão com carregamento).
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-pressed",
        secondary:
          "border border-primary bg-background text-primary hover:bg-state-hover active:bg-state-pressed",
        tertiary: "bg-transparent text-primary hover:bg-state-hover active:bg-state-pressed",
      },
      size: {
        sm: "h-8 px-4 text-sm",
        md: "h-10 px-6 text-base",
        lg: "h-12 px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? "primary"}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
