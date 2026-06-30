interface DiagramNode {
  label: string;
  caption: string;
  tone: "default" | "accent" | "success" | "info";
}

const nodes: DiagramNode[] = [
  { label: "Email", caption: "POST /emails/incoming", tone: "default" },
  {
    label: "Interaction",
    caption: "ticket_id = NULL · status = PENDING",
    tone: "info",
  },
  { label: "Inbox", caption: "GET /agents/{agent}/inbox", tone: "default" },
  {
    label: "Create Ticket",
    caption: "POST /tickets/from-interaction",
    tone: "accent",
  },
  {
    label: "Interaction",
    caption: "ticket_id assigned · status = ASSIGNED",
    tone: "success",
  },
  { label: "Timeline", caption: "GET /tickets/{id}/interactions", tone: "default" },
];

const toneClasses: Record<DiagramNode["tone"], string> = {
  default: "border-border bg-canvas text-slate-200",
  accent: "border-accent/40 bg-accent/10 text-accent",
  success: "border-success/40 bg-success/10 text-success",
  info: "border-info/40 bg-info/10 text-info",
};

export function ArchitectureDiagram() {
  return (
    <div className="flex flex-col items-stretch gap-0">
      {nodes.map((node, index) => (
        <div key={`${node.label}-${index}`} className="flex flex-col items-center">
          <div
            className={`w-full rounded-md2 border px-4 py-3 text-center ${toneClasses[node.tone]}`}
          >
            <p className="text-sm font-semibold">{node.label}</p>
            <p className="mt-0.5 font-mono text-[11px] opacity-80">
              {node.caption}
            </p>
          </div>
          {index < nodes.length - 1 && (
            <span className="py-1.5 text-muted/60">↓</span>
          )}
        </div>
      ))}
    </div>
  );
}
