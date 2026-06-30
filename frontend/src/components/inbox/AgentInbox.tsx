import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { useApiAction } from "@/hooks/useApiAction";
import { getAgentInbox, openEmail } from "@/api/agent";
import { useWorkflowContext } from "@/context/WorkflowContext";
import type { InboxItem } from "@/types";

export function AgentInbox() {
  const { agentName, setSelectedEmail, completeStep } = useWorkflowContext();
  const [items, setItems] = useState<InboxItem[]>([]);
  const [openingId, setOpeningId] = useState<string | null>(null);

  const { run: runFetch, isLoading: isFetching } = useApiAction(getAgentInbox);
  const { run: runOpen } = useApiAction(openEmail, {
    successMessage: "Email opened.",
  });

  const refresh = useCallback(async () => {
    const result = await runFetch(agentName);
    if (result) {
      setItems(result.items);
      completeStep("inbox");
    }
  }, [agentName, runFetch, completeStep]);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentName]);

  async function handleOpen(interactionId: string) {
    setOpeningId(interactionId);
    const result = await runOpen(agentName, interactionId);
    setOpeningId(null);

    if (result) {
      setSelectedEmail(result);
      completeStep("email_opened");
    }
  }

  return (
    <Card
      eyebrow="Step 2"
      title={`${agentName}'s Inbox`}
      actions={
        <Button size="sm" variant="ghost" isLoading={isFetching} onClick={refresh}>
          Refresh
        </Button>
      }
    >
      {items.length === 0 ? (
        <EmptyState
          icon="📭"
          title="Inbox is empty"
          description="Send a dummy email above, then refresh to see it appear here, unassigned and waiting."
        />
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item.interaction_id}
              className="flex items-center justify-between gap-3 rounded-md2 border border-border bg-canvas px-3.5 py-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-slate-100">
                    {item.subject}
                  </p>
                  <Badge tone="info">{item.status}</Badge>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted">
                  {item.client_name} ·{" "}
                  {new Date(item.received_at).toLocaleTimeString()}
                </p>
              </div>
              <Button
                size="sm"
                variant="primary"
                isLoading={openingId === item.interaction_id}
                onClick={() => handleOpen(item.interaction_id)}
              >
                Open Email
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
