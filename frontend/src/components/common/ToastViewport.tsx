import { useToast } from "@/context/ToastContext";

const variantStyles: Record<string, string> = {
  success: "border-success/30 bg-success/10 text-success",
  error: "border-danger/30 bg-danger/10 text-danger",
  info: "border-accent/30 bg-accent/10 text-accent",
};

export function ToastViewport() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => dismissToast(toast.id)}
          className={`cursor-pointer rounded-md2 border px-3.5 py-2.5 text-xs font-medium shadow-card animate-fadeSlideIn ${
            variantStyles[toast.variant] ?? variantStyles.info
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
