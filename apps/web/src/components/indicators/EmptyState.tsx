import { Inbox } from "lucide-react";

/** Estado vazio padrão (equivalente ao "vazio" do AsyncPanel do Aurora). */
export function EmptyState({ titulo, children }: { titulo: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed px-6 py-12 text-center">
      <Inbox className="size-8 text-muted-foreground" aria-hidden />
      <p className="font-semibold">{titulo}</p>
      {children && <p className="max-w-md text-sm text-muted-foreground">{children}</p>}
    </div>
  );
}
