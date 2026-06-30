import { apiClient } from "./client";
import type { InboxResponse, OpenEmailResponse } from "@/types";

// GET /agents/{agent_name}/inbox
export async function getAgentInbox(agentName: string): Promise<InboxResponse> {
  const { data } = await apiClient.get<InboxResponse>(
    `/agents/${encodeURIComponent(agentName)}/inbox`
  );
  return data;
}

// GET /agents/{agent_name}/inbox/{interaction_id}
export async function openEmail(
  agentName: string,
  interactionId: string
): Promise<OpenEmailResponse> {
  const { data } = await apiClient.get<OpenEmailResponse>(
    `/agents/${encodeURIComponent(agentName)}/inbox/${interactionId}`
  );
  return data;
}
