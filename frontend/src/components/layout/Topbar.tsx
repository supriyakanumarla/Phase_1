import { useWorkflowContext } from "@/context/WorkflowContext";

const AGENTS = ["Agent A", "Agent B", "Agent C"];

interface TopbarProps {
  title: string;
  description?: string;
}

export function Topbar({ title, description }: TopbarProps) {
  const { agentName, setAgentName } = useWorkflowContext();

  return (
    <header className="flex items-center justify-between border-b border-border bg-canvas/80 px-6 py-4 backdrop-blur">
      <div>
        <h1 className="text-base font-semibold text-slate-100">{title}</h1>
        {description && (
          <p className="text-xs text-muted mt-0.5">{description}</p>
        )}
      </div>

      <label className="flex items-center gap-2 text-xs text-muted">
        Acting as
        <select
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
          className="rounded-md2 border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-slate-100 focus:border-accent focus:outline-none"
        >
          {AGENTS.map((agent) => (
            <option key={agent} value={agent}>
              {agent}
            </option>
          ))}
        </select>
      </label>
    </header>
  );
}
