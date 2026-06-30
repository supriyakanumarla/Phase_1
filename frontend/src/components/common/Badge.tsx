import type { ReactNode } from "react";

type Tone = "default" | "success" | "warning" | "danger" | "info" | "accent";

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
}

const toneClasses: Record<Tone, string> = {
  default: "bg-white/5 text-slate-300 border-white/10",
  success: "bg-success/10 text-success border-success/25",
  warning: "bg-warning/10 text-warning border-warning/25",
  danger: "bg-danger/10 text-danger border-danger/25",
  info: "bg-info/10 text-info border-info/25",
  accent: "bg-accent/10 text-accent border-accent/25",
};

export function Badge({ children, tone = "default", icon }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${toneClasses[tone]}`}
    >
      {icon}
      {children}
    </span>
  );
}
