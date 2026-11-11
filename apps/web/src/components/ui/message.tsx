import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Figma: message (74:634), state = sucess | danger | info | warning.
 * Não existe no shadcn (equivale ao Alert); componente próprio do DS.
 */
const messageVariants = cva("flex gap-3 rounded-sm border-l-4 p-4 text-sm text-foreground", {
  variants: {
    state: {
      success: "border-success bg-success-muted",
      danger: "border-destructive bg-destructive-muted",
      info: "border-info bg-info-muted",
      warning: "border-warning bg-warning-muted",
    },
  },
  defaultVariants: { state: "info" },
});

const icons = {
  success: <CheckCircle2 className="size-5 text-success" aria-hidden />,
  danger: <XCircle className="size-5 text-destructive" aria-hidden />,
  info: <Info className="size-5 text-info" aria-hidden />,
  warning: <AlertTriangle className="size-5 text-warning-foreground" aria-hidden />,
};

function Message({
  className,
  state = "info",
  title,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof messageVariants> & { title?: string }) {
  return (
    <div
      role={state === "danger" ? "alert" : "status"}
      data-slot="message"
      className={cn(messageVariants({ state }), className)}
      {...props}
    >
      <span className="mt-0.5 shrink-0">{icons[state ?? "info"]}</span>
      <div className="flex flex-col gap-1">
        {title && <p className="font-semibold">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}

export { Message };
