import { useCallback, useState } from "react";
import { useToast } from "@/context/ToastContext";

// ==========================================================
// useApiAction
//
// Wraps a single backend call with loading state and toast
// feedback, so every action button in the demo follows the
// same pattern: disable while loading, show a toast with
// the result, and let the caller react to success.
// ==========================================================

export function useApiAction<TArgs extends unknown[], TResult>(
  action: (...args: TArgs) => Promise<TResult>,
  options?: {
    successMessage?: string | ((result: TResult) => string);
  }
) {
  const [isLoading, setIsLoading] = useState(false);
  const { pushToast } = useToast();

  const run = useCallback(
    async (...args: TArgs): Promise<TResult | null> => {
      setIsLoading(true);
      try {
        const result = await action(...args);

        const message =
          typeof options?.successMessage === "function"
            ? options.successMessage(result)
            : options?.successMessage;

        if (message) {
          pushToast(message, "success");
        }

        return result;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Request failed.";
        pushToast(message, "error");
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [action, options, pushToast]
  );

  return { run, isLoading };
}
