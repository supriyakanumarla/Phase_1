import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

interface FieldWrapperProps {
  label: string;
  hint?: string;
  children?: ReactNode;
}

function FieldWrapper({ label, hint, children }: FieldWrapperProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-muted/70">{hint}</span>}
    </label>
  );
}

const fieldBase =
  "w-full rounded-md2 border border-border bg-canvas px-3 py-2 text-sm text-slate-100 " +
  "placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors";

export function TextInput({
  label,
  hint,
  ...rest
}: FieldWrapperProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldWrapper label={label} hint={hint}>
      <input className={fieldBase} {...rest} />
    </FieldWrapper>
  );
}

export function TextArea({
  label,
  hint,
  ...rest
}: FieldWrapperProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldWrapper label={label} hint={hint}>
      <textarea className={`${fieldBase} min-h-[88px] resize-y`} {...rest} />
    </FieldWrapper>
  );
}

export function SelectInput({
  label,
  hint,
  children,
  ...rest
}: FieldWrapperProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldWrapper label={label} hint={hint}>
      <select className={fieldBase} {...rest}>
        {children}
      </select>
    </FieldWrapper>
  );
}
