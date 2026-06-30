import { useState } from "react";
import { Card } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { Modal } from "@/components/common/Modal";
import { SelectInput, TextInput } from "@/components/common/FormField";
import { useApiAction } from "@/hooks/useApiAction";
import { attachInteractionToTicket, createTicketFromInteraction, getTicket } from "@/api/ticket";
import { useWorkflowContext } from "@/context/WorkflowContext";
import type { TicketPriority } from "@/types";

const PRIORITIES: TicketPriority[] = ["LOW", "MEDIUM", "HIGH"];

export function EmailDetails() {
  const { selectedEmail, activeTicket, setActiveTicket, completeStep } =
    useWorkflowContext();

  const [createOpen, setCreateOpen] = useState(false);
  const [attachOpen, setAttachOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [ticketType, setTicketType] = useState("TECHNICAL");
  const [priority, setPriority] = useState<TicketPriority>("MEDIUM");
  const [existingTicketId, setExistingTicketId] = useState("");

  const { run: runCreate, isLoading: isCreating } = useApiAction(
    createTicketFromInteraction,
    { successMessage: "Ticket created from this email." }
  );

  const { run: runAttach, isLoading: isAttaching } = useApiAction(
    attachInteractionToTicket,
    { successMessage: "Email attached to existing ticket." }
  );

  const { run: runGetTicket } = useApiAction(getTicket);

  if (!selectedEmail) {
    return (
      <Card eyebrow="Step 3" title="Email Details">
        <EmptyState
          icon="✉️"
          title="No email selected"
          description="Open an email from the inbox to see its full content here."
        />
      </Card>
    );
  }

  async function handleCreateTicket() {
    if (!selectedEmail) return;

    const result = await runCreate({
      interaction_id: selectedEmail.interaction_id,
      title: title || selectedEmail.subject,
      ticket_type: ticketType,
      current_priority: priority,
    });

    if (result) {
      setCreateOpen(false);
      completeStep("ticket_created");

      const ticket = await runGetTicket(result.ticket_id);
      if (ticket) setActiveTicket(ticket);
    }
  }

  async function handleAttachExisting() {
    if (!selectedEmail || !existingTicketId) return;

    const result = await runAttach(existingTicketId, {
      interaction_id: selectedEmail.interaction_id,
    });

    if (result) {
      setAttachOpen(false);
      completeStep("ticket_created");

      const ticket = await runGetTicket(result.ticket_id);
      if (ticket) setActiveTicket(ticket);
    }
  }

  return (
    <>
      <Card eyebrow="Step 3" title="Email Details">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-100">
              {selectedEmail.subject}
            </p>
            <Badge tone="info">{selectedEmail.status}</Badge>
          </div>

          <p className="text-xs text-muted">
            From <span className="text-slate-300">{selectedEmail.from_email}</span>{" "}
            ({selectedEmail.client_name}) · to {selectedEmail.agent_name}
          </p>

          <p className="rounded-md2 border border-border bg-canvas p-3 text-sm text-slate-300">
            {selectedEmail.body}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <Button variant="primary" size="sm" onClick={() => setCreateOpen(true)}>
              Create Ticket
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setAttachOpen(true)}>
              Attach Existing Ticket
            </Button>
          </div>

          {activeTicket && (
            <p className="text-[11px] text-muted">
              Linked to ticket{" "}
              <span className="font-mono text-accent">
                {activeTicket.ticket_id.slice(0, 8)}…
              </span>
            </p>
          )}
        </div>
      </Card>

      <Modal
        open={createOpen}
        title="Create Ticket From This Email"
        onClose={() => setCreateOpen(false)}
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              isLoading={isCreating}
              onClick={handleCreateTicket}
            >
              Create Ticket
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <TextInput
            label="Title"
            placeholder={selectedEmail.subject}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextInput
            label="Ticket type"
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
          />
          <SelectInput
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TicketPriority)}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </SelectInput>
        </div>
      </Modal>

      <Modal
        open={attachOpen}
        title="Attach To Existing Ticket"
        onClose={() => setAttachOpen(false)}
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setAttachOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              isLoading={isAttaching}
              onClick={handleAttachExisting}
            >
              Attach
            </Button>
          </>
        }
      >
        <TextInput
          label="Existing ticket ID"
          placeholder="Paste a ticket_id"
          value={existingTicketId}
          onChange={(e) => setExistingTicketId(e.target.value)}
        />
      </Modal>
    </>
  );
}
