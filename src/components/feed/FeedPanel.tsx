import type { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "../lib/utils";

export function FeedPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("border-none", className)}>
      <CardContent className="p-5 sm:p-5">{children}</CardContent>
    </Card>
  );
}

export function FeedPanelHeader({
  title,
  actionLabel,
  actionHref,
}: {
  title: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h4 className="text-base font-semibold text-foreground">{title}</h4>
      {actionLabel && actionHref && (
        <a
          href={actionHref}
          className="text-xs font-medium text-primary hover:underline"
        >
          {actionLabel}
        </a>
      )}
    </div>
  );
}
