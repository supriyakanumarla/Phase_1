import { Card } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { useApiAction } from "@/hooks/useApiAction";
import { hideInteraction } from "@/api/interaction";
import { useWorkflowContext } from "@/context/WorkflowContext";
import type { InteractionResponse } from "@/types";

interface TimelineMeta {
  icon: string;
  label: string;
  tone: "default" | "success" | "warning" | "danger" | "info" | "accent";
}

const TYPE_META: Record<string, TimelineMeta> = {
  EMAIL: { icon: "📧", label: "Client Email", tone: "accent" },
  INTERNAL_NOTE: { icon: "📝", label: "Internal Note", tone: "warning" },
  REPLY: { icon: "📤", label: "Reply", tone: "success" },
  STATUS_CHANGE: { icon: "⚙", label: "Status Change", tone: "info" },
  PRIORITY_CHANGE: { icon: "🔥", label: "Priority Change", tone: "danger" },
  ATTACHMENT: { icon: "📎", label: "Attachment", tone: "default" },
};

function metaFor(type: string): TimelineMeta {
  return TYPE_META[type] ?? { icon: "•", label: type, tone: "default" };
}

function summarize(interaction: InteractionResponse): string {
  const payload = interaction.payload ?? {};

  switch (interaction.interaction_type) {
    case "EMAIL":
      return (payload.subject as string) ?? "Email received";
    case "INTERNAL_NOTE":
      return (payload.note as string) ?? "";
    case "REPLY":
      return (payload.message as string) ?? "";
    case "STATUS_CHANGE":
      return `${payload.from ?? "?"} → ${payload.to ?? "?"}`;
    case "PRIORITY_CHANGE":
      return `${payload.from ?? "?"} → ${payload.to ?? "?"}`;
    case "ATTACHMENT":
      return (payload.filename as string) ?? "File uploaded";
    default:
      return JSON.stringify(payload);
  }
}

interface TicketTimelineProps {
  onChanged: () => void;
}

export function TicketTimeline({ onChanged }: TicketTimelineProps) {
  const { activeTicket, timeline } = useWorkflowContext();

  const { run: runHide, isLoading: isHiding } = useApiAction(hideInteraction, {
    successMessage: "Interaction hidden.",
  });

  if (!activeTicket) {
    return (
      <Card eyebrow="Step 6" title="Ticket Timeline">
        <EmptyState
          icon="🕒"
          title="No timeline yet"
          description="The timeline fills in as actions are performed on the ticket."
        />
      </Card>
    );
  }

  async function handleHide(interactionId: string) {
    const result = await runHide(activeTicket!.ticket_id, interactionId, {
      removed_by: null,
    });
    if (result) onChanged();
  }

  return (
    <Card eyebrow="Step 6" title="Ticket Timeline">
      {timeline.length === 0 ? (
        <EmptyState
          icon="🕒"
          title="No interactions yet"
          description="Once an interaction is created for this ticket, it will appear here."
        />
      ) : (
        <ol className="flex flex-col gap-0">
          {timeline.map((interaction, index) => {
            const meta = metaFor(interaction.interaction_type);
            const isLast = index === timeline.length - 1;

            return (
              <li key={interaction.interaction_id} className="flex gap-3 animate-fadeSlideIn">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border text-sm ${
                      interaction.is_visible
                        ? "border-border bg-canvas"
                        : "border-border bg-canvas opacity-40"
                    }`}
                  >
                    {meta.icon}
                  </div>
                  {!isLast && <div className="w-px flex-1 bg-border" />}
                </div>

                <div className={`flex-1 pb-5 ${!interaction.is_visible ? "opacity-40" : ""}`}>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-100">
                      {meta.label}
                    </p>
                    <Badge tone={meta.tone}>{interaction.direction}</Badge>
                    {!interaction.is_visible && (
                      <Badge tone="danger">hidden</Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {summarize(interaction)}
                  </p>
                  <div className="mt-1 flex items-center gap-3">
                    <p className="text-[11px] text-muted">
                      {new Date(interaction.created_at).toLocaleString()}
                    </p>
                    {interaction.is_visible && (
                      <button
                        disabled={isHiding}
                        onClick={() => handleHide(interaction.interaction_id)}
                        className="text-[11px] text-muted hover:text-danger disabled:opacity-50"
                      >
                        Hide
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </Card>
  );
}
