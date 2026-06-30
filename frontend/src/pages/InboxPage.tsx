import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { IncomingEmailPanel } from "@/components/email/IncomingEmailPanel";
import { AgentInbox } from "@/components/inbox/AgentInbox";
import { EmailDetails } from "@/components/inbox/EmailDetails";
import { Button } from "@/components/common/Button";
import { useWorkflowContext } from "@/context/WorkflowContext";

export function InboxPage() {
  const { activeTicket } = useWorkflowContext();
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Agent Inbox"
      description="Receive a dummy email, watch it land in the agent's inbox, then open it and decide what to do."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <IncomingEmailPanel />
          <AgentInbox />
        </div>

        <div className="flex flex-col gap-6">
          <EmailDetails />

          {activeTicket && (
            <div className="rounded-md2 border border-accent/30 bg-accent/5 p-4">
              <p className="text-sm font-medium text-slate-100">
                Ticket ready — continue on the Ticket page
              </p>
              <p className="mt-1 text-xs text-muted">
                Reply, add notes, change status/priority, and watch the
                timeline update live.
              </p>
              <Button
                variant="primary"
                size="sm"
                className="mt-3"
                onClick={() => navigate("/ticket")}
              >
                Go to Ticket →
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
