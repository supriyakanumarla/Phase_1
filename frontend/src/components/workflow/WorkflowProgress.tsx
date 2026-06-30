import { useWorkflowContext } from "@/context/WorkflowContext";

export function WorkflowProgress() {
  const { steps, resetWorkflow } = useWorkflowContext();
  const doneCount = steps.filter((s) => s.done).length;

  return (
    <div className="rounded-md2 border border-border bg-canvas p-3.5">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
          Workflow progress
        </p>
        <span className="text-[11px] font-mono text-muted">
          {doneCount}/{steps.length}
        </span>
      </div>

      <ul className="flex flex-col gap-2">
        {steps.map((step) => (
          <li
            key={step.id}
            className={`flex items-center gap-2 text-xs transition-colors ${
              step.done ? "text-slate-200" : "text-muted/70"
            }`}
          >
            <span
              className={`flex h-4 w-4 flex-none items-center justify-center rounded-[5px] border text-[10px] ${
                step.done
                  ? "border-success/40 bg-success/15 text-success"
                  : "border-border bg-surface text-transparent"
              }`}
            >
              {step.done ? "✓" : ""}
            </span>
            {step.label}
          </li>
        ))}
      </ul>

      <button
        onClick={resetWorkflow}
        className="mt-3.5 w-full rounded-md2 border border-border bg-surface px-2.5 py-1.5 text-[11px] font-medium text-muted hover:text-slate-100 hover:bg-surfaceHover transition-colors"
      >
        Reset demo state
      </button>
    </div>
  );
}
