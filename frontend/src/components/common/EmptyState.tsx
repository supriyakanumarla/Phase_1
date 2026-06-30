import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      {icon && <div className="text-2xl opacity-60">{icon}</div>}
      <p className="text-sm font-medium text-slate-300">{title}</p>
      {description && (
        <p className="max-w-xs text-xs text-muted">{description}</p>
      )}
    </div>
  );
}
