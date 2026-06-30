import axios from "axios";

// ==========================================================
// Axios instance pointed at the FastAPI backend.
//
// Base URL comes from VITE_API_BASE_URL (.env), so the
// backend host can change without touching any code.
// ==========================================================

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Surface backend error details consistently as a single
// readable message, so UI components don't each need to
// know FastAPI's error response shape.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const detail =
      error?.response?.data?.detail ??
      error?.message ??
      "Something went wrong while talking to the backend.";

    return Promise.reject(
      new Error(typeof detail === "string" ? detail : JSON.stringify(detail))
    );
  }
);
