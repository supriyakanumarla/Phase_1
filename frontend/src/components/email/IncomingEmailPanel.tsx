import { useState } from "react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { TextArea, TextInput } from "@/components/common/FormField";
import { useApiAction } from "@/hooks/useApiAction";
import { receiveIncomingEmail } from "@/api/email";
import { useWorkflowContext } from "@/context/WorkflowContext";

const DUMMY_SENDERS = [
  { email: "abcclinic@gmail.com", label: "ABC Clinic → Agent A" },
  { email: "xyzclinic@gmail.com", label: "XYZ Clinic → Agent B" },
  { email: "lmnclinic@gmail.com", label: "LMN Clinic → Agent C" },
];

function randomMessageId() {
  return `demo-msg-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function IncomingEmailPanel() {
  const { completeStep } = useWorkflowContext();

  const [fromEmail, setFromEmail] = useState(DUMMY_SENDERS[0].email);
  const [subject, setSubject] = useState("Unable to Login");
  const [body, setBody] = useState("Doctor cannot login to the patient portal.");

  const { run, isLoading } = useApiAction(receiveIncomingEmail, {
    successMessage: (res) =>
      `Email received. Routed to ${res.agent_name}'s inbox.`,
  });

  async function handleSend() {
    const result = await run({
      from_email: fromEmail,
      subject,
      body,
      message_id: randomMessageId(),
    });

    if (result) {
      completeStep("email_received");
    }
  }

  return (
    <Card
      eyebrow="Step 1"
      title="Incoming Email"
      actions={
        <Button variant="primary" size="sm" isLoading={isLoading} onClick={handleSend}>
          Receive Dummy Email
        </Button>
      }
    >
      <div className="flex flex-col gap-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">
            From (client)
          </span>
          <select
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            className="w-full rounded-md2 border border-border bg-canvas px-3 py-2 text-sm text-slate-100 focus:border-accent focus:outline-none"
          >
            {DUMMY_SENDERS.map((sender) => (
              <option key={sender.email} value={sender.email}>
                {sender.label}
              </option>
            ))}
          </select>
        </label>

        <TextInput
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <TextArea
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <p className="text-[11px] text-muted">
          Each click generates a unique message ID, so the same email can be
          sent repeatedly for the demo.
        </p>
      </div>
    </Card>
  );
}
