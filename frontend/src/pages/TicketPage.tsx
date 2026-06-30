import { useCallback, useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { TextInput } from "@/components/common/FormField";
import { TicketDetails } from "@/components/ticket/TicketDetails";
import { TicketActions } from "@/components/ticket/TicketActions";
import { TicketTimeline } from "@/components/ticket/TicketTimeline";
import { useApiAction } from "@/hooks/useApiAction";
import { getTicket } from "@/api/ticket";
import { getTicketTimeline } from "@/api/interaction";
import { useWorkflowContext } from "@/context/WorkflowContext";

export function TicketPage() {
  const { activeTicket, setActiveTicket, setTimeline } = useWorkflowContext();
  const [manualTicketId, setManualTicketId] = useState("");

  const { run: runGetTicket, isLoading: isLoadingTicket } = useApiAction(getTicket);
  const { run: runGetTimeline } = useApiAction(getTicketTimeline);

  const refreshTimeline = useCallback(async () => {
    if (!activeTicket) return;
    const items = await runGetTimeline(activeTicket.ticket_id);
    if (items) setTimeline(items);
  }, [activeTicket, runGetTimeline, setTimeline]);

  const refreshAll = useCallback(async () => {
    if (!activeTicket) return;
    const ticket = await runGetTicket(activeTicket.ticket_id);
    if (ticket) setActiveTicket(ticket);
    await refreshTimeline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTicket?.ticket_id]);

  useEffect(() => {
    refreshTimeline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTicket?.ticket_id]);

  async function handleLoadManualTicket() {
    if (!manualTicketId) return;
    const ticket = await runGetTicket(manualTicketId);
    if (ticket) setActiveTicket(ticket);
  }

  return (
    <AppLayout
      title="Ticket"
      description="Every action you take here is recorded as an interaction on the timeline below."
    >
      {!activeTicket && (
        <Card eyebrow="Load a ticket" title="Open by Ticket ID" className="mb-6">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <TextInput
                label="Ticket ID"
                placeholder="Paste a ticket_id"
                value={manualTicketId}
                onChange={(e) => setManualTicketId(e.target.value)}
              />
            </div>
            <Button
              variant="primary"
              size="md"
              isLoading={isLoadingTicket}
              onClick={handleLoadManualTicket}
            >
              Load
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <TicketDetails />
          <TicketActions onActionComplete={refreshAll} />
        </div>

        <TicketTimeline onChanged={refreshTimeline} />
      </div>
    </AppLayout>
  );
}
