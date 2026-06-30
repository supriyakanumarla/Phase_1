import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

export function Card({
  title,
  eyebrow,
  actions,
  children,
  className = "",
  ...rest
}: CardProps) {
  return (
    <div
      className={`rounded-md2 border border-border bg-surface shadow-card ${className}`}
      {...rest}
    >
      {(title || actions || eyebrow) && (
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            {eyebrow && (
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-0.5">
                {eyebrow}
              </p>
            )}
            {title && (
              <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
