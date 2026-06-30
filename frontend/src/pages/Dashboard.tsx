import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { ArchitectureDiagram } from "@/components/workflow/ArchitectureDiagram";

export function Dashboard() {
  return (
    <AppLayout
      title="Dashboard"
      description="A visual walkthrough of the ticket management backend workflow."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card
          eyebrow="Overview"
          title="What this demo shows"
        >
          <p className="text-sm text-slate-300">
            This is a thin visual layer over the real FastAPI backend. Every
            button here calls an actual endpoint — nothing is mocked. The
            goal is to make the interaction-centric design (emails and ticket
            activity all stored as <span className="font-mono text-accent">interactions</span>,
            routed through an unassigned inbox before a human decides what to
            do with them) easy to see and explain.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-md2 border border-border bg-canvas p-4">
              <p className="text-sm font-semibold text-slate-100">
                1 · Email → Inbox
              </p>
              <p className="mt-1 text-xs text-muted">
                A client email becomes a pending interaction with no ticket
                attached, and is routed to the assigned agent.
              </p>
            </div>
            <div className="rounded-md2 border border-border bg-canvas p-4">
              <p className="text-sm font-semibold text-slate-100">
                2 · Agent decides
              </p>
              <p className="mt-1 text-xs text-muted">
                The agent opens the email and either creates a new ticket or
                attaches it to an existing one.
              </p>
            </div>
            <div className="rounded-md2 border border-border bg-canvas p-4">
              <p className="text-sm font-semibold text-slate-100">
                3 · Ticket timeline
              </p>
              <p className="mt-1 text-xs text-muted">
                Every action on a ticket — reply, note, status, priority,
                attachment — is stored as another interaction.
              </p>
            </div>
            <div className="rounded-md2 border border-border bg-canvas p-4">
              <p className="text-sm font-semibold text-slate-100">
                4 · Full audit trail
              </p>
              <p className="mt-1 text-xs text-muted">
                Interactions are never hard-deleted — they're hidden, keeping
                the history intact.
              </p>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <Link to="/inbox">
              <Button variant="primary" size="sm">
                Start the workflow →
              </Button>
            </Link>
            <Link to="/ticket">
              <Button variant="secondary" size="sm">
                Jump to a ticket
              </Button>
            </Link>
          </div>
        </Card>

        <Card eyebrow="Backend Architecture" title="Email → Ticket → Timeline">
          <ArchitectureDiagram />
        </Card>
      </div>
    </AppLayout>
  );
}
