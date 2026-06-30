import { apiClient } from "./client";
import type { EmailRequest, EmailResponse } from "@/types";

// POST /emails/incoming
export async function receiveIncomingEmail(
  payload: EmailRequest
): Promise<EmailResponse> {
  const { data } = await apiClient.post<EmailResponse>(
    "/emails/incoming",
    payload
  );
  return data;
}
