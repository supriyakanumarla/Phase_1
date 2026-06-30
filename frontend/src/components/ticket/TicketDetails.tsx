import { Card } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { EmptyState } from "@/components/common/EmptyState";
import { useWorkflowContext } from "@/context/WorkflowContext";
import type { TicketPriority, TicketStatus } from "@/types";

const statusTone: Record<TicketStatus, "default" | "success" | "warning" | "danger" | "info" | "accent"> = {
  OPEN: "accent",
  IN_PROGRESS: "info",
  PENDING: "warning",
  WAITING_FOR_CLIENT: "warning",
  RESOLVED: "success",
  CLOSED: "default",
};

const priorityTone: Record<TicketPriority, "default" | "success" | "warning" | "danger"> = {
  LOW: "default",
  MEDIUM: "warning",
  HIGH: "danger",
};

export function TicketDetails() {
  const { activeTicket } = useWorkflowContext();

  if (!activeTicket) {
    return (
      <Card eyebrow="Step 4" title="Ticket Details">
        <EmptyState
          icon="🎫"
          title="No active ticket"
          description="Create a ticket from an inbox email, or open the Ticket page with an existing ticket ID."
        />
      </Card>
    );
  }

  return (
    <Card eyebrow="Step 4" title="Ticket Details">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-100">
              {activeTicket.title}
            </p>
            <p className="mt-0.5 font-mono text-[11px] text-muted">
              {activeTicket.ticket_id}
            </p>
          </div>
          <div className="flex flex-none flex-col items-end gap-1.5">
            <Badge tone={statusTone[activeTicket.current_status]}>
              {activeTicket.current_status}
            </Badge>
            <Badge tone={priorityTone[activeTicket.current_priority]}>
              {activeTicket.current_priority} priority
            </Badge>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <dt className="text-muted">Type</dt>
            <dd className="text-slate-300 mt-0.5">{activeTicket.ticket_type}</dd>
          </div>
          <div>
            <dt className="text-muted">Version</dt>
            <dd className="text-slate-300 mt-0.5">{activeTicket.version}</dd>
          </div>
          <div>
            <dt className="text-muted">Client ID</dt>
            <dd className="truncate font-mono text-slate-300 mt-0.5">
              {activeTicket.client_id}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Agent ID</dt>
            <dd className="truncate font-mono text-slate-300 mt-0.5">
              {activeTicket.agent_id ?? "Unassigned"}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Created</dt>
            <dd className="text-slate-300 mt-0.5">
              {new Date(activeTicket.created_at).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Updated</dt>
            <dd className="text-slate-300 mt-0.5">
              {new Date(activeTicket.updated_at).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>
    </Card>
  );
}
