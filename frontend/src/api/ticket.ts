import { apiClient } from "./client";
import type {
  AttachInteractionRequest,
  AttachInteractionResponse,
  TicketFromInteractionRequest,
  TicketFromInteractionResponse,
  TicketResponse,
  TicketUpdateRequest,
} from "@/types";

// POST /tickets/from-interaction
export async function createTicketFromInteraction(
  payload: TicketFromInteractionRequest
): Promise<TicketFromInteractionResponse> {
  const { data } = await apiClient.post<TicketFromInteractionResponse>(
    "/tickets/from-interaction",
    payload
  );
  return data;
}

// POST /tickets/{ticket_id}/attach-interaction
export async function attachInteractionToTicket(
  ticketId: string,
  payload: AttachInteractionRequest
): Promise<AttachInteractionResponse> {
  const { data } = await apiClient.post<AttachInteractionResponse>(
    `/tickets/${ticketId}/attach-interaction`,
    payload
  );
  return data;
}

// GET /tickets/{ticket_id}
export async function getTicket(ticketId: string): Promise<TicketResponse> {
  const { data } = await apiClient.get<TicketResponse>(`/tickets/${ticketId}`);
  return data;
}

// PATCH /tickets/{ticket_id}
export async function updateTicket(
  ticketId: string,
  payload: TicketUpdateRequest
): Promise<TicketResponse> {
  const { data } = await apiClient.patch<TicketResponse>(
    `/tickets/${ticketId}`,
    payload
  );
  return data;
}
