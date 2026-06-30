import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { ToastViewport } from "@/components/common/ToastViewport";

interface AppLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function AppLayout({ title, description, children }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title={title} description={description} />
        <main className="flex-1 overflow-y-auto scrollbar-thin px-6 py-6">
          {children}
        </main>
      </div>
      <ToastViewport />
    </div>
  );
}
