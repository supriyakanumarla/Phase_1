import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  icon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent/90 border border-accent/0 shadow-card",
  secondary:
    "bg-surface text-slate-200 hover:bg-surfaceHover border border-border",
  ghost:
    "bg-transparent text-muted hover:text-slate-100 hover:bg-surfaceHover border border-transparent",
  danger:
    "bg-danger/10 text-danger hover:bg-danger/20 border border-danger/30",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-xs px-2.5 py-1.5 gap-1.5",
  md: "text-sm px-3.5 py-2 gap-2",
};

export function Button({
  variant = "secondary",
  size = "md",
  isLoading = false,
  icon,
  children,
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md2 font-medium
        transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed
        whitespace-nowrap ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <span className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : (
        icon
      )}
      {children}
    </button>
  );
}
