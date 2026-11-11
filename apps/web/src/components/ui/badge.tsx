import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Figma: tag (75:1228), type=status | text.
 * Tons de status iguais aos do ToneBadge do Aurora (fundo claro, texto escuro da mesma família).
 * Pendente: type=interactive (filtro removível) e type=score.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-semibold whitespace-nowrap [&_svg]:size-3",
  {
    variants: {
      variant: {
        neutral: "bg-secondary text-secondary-foreground",
        primary: "bg-primary text-primary-foreground",
        success: "bg-success-muted text-(--ds-green-cool-vivid-70)",
        warning: "bg-warning-muted text-(--ds-yellow-vivid-80)",
        danger: "bg-destructive-muted text-(--ds-red-vivid-60)",
        info: "bg-info-muted text-accent-foreground",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
