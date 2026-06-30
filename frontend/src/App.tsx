import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { WorkflowProvider } from "@/context/WorkflowContext";
import { ToastProvider } from "@/context/ToastContext";
import { Dashboard } from "@/pages/Dashboard";
import { InboxPage } from "@/pages/InboxPage";
import { TicketPage } from "@/pages/TicketPage";

export function App() {
  return (
    <ToastProvider>
      <WorkflowProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/ticket" element={<TicketPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </WorkflowProvider>
    </ToastProvider>
  );
}
