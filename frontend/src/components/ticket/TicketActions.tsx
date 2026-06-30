import { useState } from "react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import { SelectInput, TextArea, TextInput } from "@/components/common/FormField";
import { EmptyState } from "@/components/common/EmptyState";
import { useApiAction } from "@/hooks/useApiAction";
import {
  addInternalNote,
  changeTicketPriority,
  changeTicketStatus,
  replyToClient,
  uploadAttachment,
} from "@/api/interaction";
import { updateTicket } from "@/api/ticket";
import { useWorkflowContext } from "@/context/WorkflowContext";
import type { TicketPriority, TicketStatus } from "@/types";

const STATUSES: TicketStatus[] = [
  "OPEN",
  "IN_PROGRESS",
  "PENDING",
  "WAITING_FOR_CLIENT",
  "RESOLVED",
  "CLOSED",
];

const PRIORITIES: TicketPriority[] = ["LOW", "MEDIUM", "HIGH"];

type ActiveModal =
  | "note"
  | "reply"
  | "status"
  | "priority"
  | "assign"
  | "attachment"
  | null;

interface TicketActionsProps {
  onActionComplete: () => void;
}

export function TicketActions({ onActionComplete }: TicketActionsProps) {
  const { activeTicket, completeStep } = useWorkflowContext();
  const [modal, setModal] = useState<ActiveModal>(null);

  const [note, setNote] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [newStatus, setNewStatus] = useState<TicketStatus>("IN_PROGRESS");
  const [newPriority, setNewPriority] = useState<TicketPriority>("HIGH");
  const [agentId, setAgentId] = useState("");
  const [filename, setFilename] = useState("screenshot.png");
  const [storageKey, setStorageKey] = useState("uploads/demo/screenshot.png");

  const { run: runNote, isLoading: isNoteLoading } = useApiAction(addInternalNote, {
    successMessage: "Internal note added.",
  });
  const { run: runReply, isLoading: isReplyLoading } = useApiAction(replyToClient, {
    successMessage: "Reply sent to client.",
  });
  const { run: runStatus, isLoading: isStatusLoading } = useApiAction(
    changeTicketStatus,
    { successMessage: "Ticket status changed." }
  );
  const { run: runPriority, isLoading: isPriorityLoading } = useApiAction(
    changeTicketPriority,
    { successMessage: "Ticket priority changed." }
  );
  const { run: runAssign, isLoading: isAssignLoading } = useApiAction(
    updateTicket,
    { successMessage: "Agent assigned to ticket." }
  );
  const { run: runUpload, isLoading: isUploadLoading } = useApiAction(
    uploadAttachment,
    { successMessage: "Attachment uploaded." }
  );

  if (!activeTicket) {
    return (
      <Card eyebrow="Step 5" title="Ticket Actions">
        <EmptyState
          icon="⚙️"
          title="No active ticket"
          description="Actions become available once a ticket exists."
        />
      </Card>
    );
  }

  function closeModal() {
    setModal(null);
  }

  async function handleAddNote() {
    const result = await runNote(activeTicket!.ticket_id, { note });
    if (result) {
      setNote("");
      closeModal();
      onActionComplete();
    }
  }

  async function handleReply() {
    const result = await runReply(activeTicket!.ticket_id, {
      message: replyMessage,
    });
    if (result) {
      setReplyMessage("");
      closeModal();
      completeStep("reply");
      onActionComplete();
    }
  }

  async function handleStatusChange() {
    const result = await runStatus(activeTicket!.ticket_id, {
      new_status: newStatus,
    });
    if (result) {
      closeModal();
      completeStep("status_changed");
      onActionComplete();
    }
  }

  async function handlePriorityChange() {
    const result = await runPriority(activeTicket!.ticket_id, {
      new_priority: newPriority,
    });
    if (result) {
      closeModal();
      completeStep("priority_changed");
      onActionComplete();
    }
  }

  async function handleAssignAgent() {
    const result = await runAssign(activeTicket!.ticket_id, { agent_id: agentId });
    if (result) {
      setAgentId("");
      closeModal();
      onActionComplete();
    }
  }

  async function handleUpload() {
    const result = await runUpload(activeTicket!.ticket_id, {
      filename,
      storage_key: storageKey,
      mime_type: "image/png",
      size_bytes: 204800,
    });
    if (result) {
      closeModal();
      completeStep("attachment_uploaded");
      onActionComplete();
    }
  }

  return (
    <>
      <Card eyebrow="Step 5" title="Ticket Actions">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={() => setModal("reply")}>
            📤 Reply
          </Button>
          <Button size="sm" variant="secondary" onClick={() => setModal("note")}>
            📝 Add Internal Note
          </Button>
          <Button size="sm" variant="secondary" onClick={() => setModal("status")}>
            ⚙ Change Status
          </Button>
          <Button size="sm" variant="secondary" onClick={() => setModal("priority")}>
            🔥 Change Priority
          </Button>
          <Button size="sm" variant="secondary" onClick={() => setModal("assign")}>
            👤 Assign Agent
          </Button>
          <Button size="sm" variant="secondary" onClick={() => setModal("attachment")}>
            📎 Upload Attachment
          </Button>
        </div>
      </Card>

      <Modal
        open={modal === "note"}
        title="Add Internal Note"
        onClose={closeModal}
        footer={
          <Button variant="primary" size="sm" isLoading={isNoteLoading} onClick={handleAddNote}>
            Add Note
          </Button>
        }
      >
        <TextArea
          label="Note (visible to agents only)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Modal>

      <Modal
        open={modal === "reply"}
        title="Reply To Client"
        onClose={closeModal}
        footer={
          <Button variant="primary" size="sm" isLoading={isReplyLoading} onClick={handleReply}>
            Send Reply
          </Button>
        }
      >
        <TextArea
          label="Message"
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
        />
      </Modal>

      <Modal
        open={modal === "status"}
        title="Change Ticket Status"
        onClose={closeModal}
        footer={
          <Button
            variant="primary"
            size="sm"
            isLoading={isStatusLoading}
            onClick={handleStatusChange}
          >
            Update Status
          </Button>
        }
      >
        <SelectInput
          label="New status"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value as TicketStatus)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </SelectInput>
      </Modal>

      <Modal
        open={modal === "priority"}
        title="Change Ticket Priority"
        onClose={closeModal}
        footer={
          <Button
            variant="primary"
            size="sm"
            isLoading={isPriorityLoading}
            onClick={handlePriorityChange}
          >
            Update Priority
          </Button>
        }
      >
        <SelectInput
          label="New priority"
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value as TicketPriority)}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </SelectInput>
      </Modal>

      <Modal
        open={modal === "assign"}
        title="Assign Agent"
        onClose={closeModal}
        footer={
          <Button
            variant="primary"
            size="sm"
            isLoading={isAssignLoading}
            onClick={handleAssignAgent}
          >
            Assign
          </Button>
        }
      >
        <TextInput
          label="Agent user_id (UUID)"
          placeholder="aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
        />
        <p className="mt-2 text-[11px] text-muted">
          There is no real user directory yet, so paste any RBAC user UUID
          (e.g. one of the dummy agent IDs from the seed data).
        </p>
      </Modal>

      <Modal
        open={modal === "attachment"}
        title="Upload Attachment"
        onClose={closeModal}
        footer={
          <Button variant="primary" size="sm" isLoading={isUploadLoading} onClick={handleUpload}>
            Upload
          </Button>
        }
      >
        <div className="flex flex-col gap-3">
          <TextInput
            label="Filename"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
          <TextInput
            label="Storage key"
            value={storageKey}
            onChange={(e) => setStorageKey(e.target.value)}
            hint="Placeholder path — no real file storage is wired up in this demo."
          />
        </div>
      </Modal>
    </>
  );
}
