import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  InteractionResponse,
  OpenEmailResponse,
  TicketResponse,
  WorkflowStep,
  WorkflowStepId,
} from "@/types";

// ==========================================================
// WorkflowContext
//
// This is a frontend-only construct. It does not exist on
// the backend. Its only job is to remember which entities
// the demo is currently looking at (agent / interaction /
// ticket) and which workflow steps have been completed, so
// the Sidebar progress tracker and the pages stay in sync
// without re-fetching everything on every screen.
// ==========================================================

const STEP_DEFINITIONS: { id: WorkflowStepId; label: string }[] = [
  { id: "email_received", label: "Email received" },
  { id: "inbox", label: "Inbox" },
  { id: "email_opened", label: "Open email" },
  { id: "ticket_created", label: "Ticket created" },
  { id: "reply", label: "Reply sent" },
  { id: "status_changed", label: "Status changed" },
  { id: "priority_changed", label: "Priority changed" },
  { id: "attachment_uploaded", label: "Attachment uploaded" },
];

interface WorkflowContextValue {
  agentName: string;
  setAgentName: (name: string) => void;

  selectedEmail: OpenEmailResponse | null;
  setSelectedEmail: (email: OpenEmailResponse | null) => void;

  activeTicket: TicketResponse | null;
  setActiveTicket: (ticket: TicketResponse | null) => void;

  timeline: InteractionResponse[];
  setTimeline: (items: InteractionResponse[]) => void;

  steps: WorkflowStep[];
  completeStep: (id: WorkflowStepId) => void;
  resetWorkflow: () => void;
}

const WorkflowContext = createContext<WorkflowContextValue | undefined>(
  undefined
);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [agentName, setAgentName] = useState<string>("Agent A");
  const [selectedEmail, setSelectedEmail] = useState<OpenEmailResponse | null>(
    null
  );
  const [activeTicket, setActiveTicket] = useState<TicketResponse | null>(
    null
  );
  const [timeline, setTimeline] = useState<InteractionResponse[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<WorkflowStepId>>(
    new Set()
  );

  const completeStep = useCallback((id: WorkflowStepId) => {
    setCompletedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const resetWorkflow = useCallback(() => {
    setSelectedEmail(null);
    setActiveTicket(null);
    setTimeline([]);
    setCompletedIds(new Set());
  }, []);

  const steps = useMemo<WorkflowStep[]>(
    () =>
      STEP_DEFINITIONS.map((def) => ({
        ...def,
        done: completedIds.has(def.id),
      })),
    [completedIds]
  );

  const value: WorkflowContextValue = {
    agentName,
    setAgentName,
    selectedEmail,
    setSelectedEmail,
    activeTicket,
    setActiveTicket,
    timeline,
    setTimeline,
    steps,
    completeStep,
    resetWorkflow,
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflowContext(): WorkflowContextValue {
  const ctx = useContext(WorkflowContext);
  if (!ctx) {
    throw new Error(
      "useWorkflowContext must be used inside a <WorkflowProvider>."
    );
  }
  return ctx;
}
