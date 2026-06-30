import { NavLink } from "react-router-dom";
import { WorkflowProgress } from "@/components/workflow/WorkflowProgress";

const navItems = [
  { to: "/", label: "Dashboard", icon: "🏠" },
  { to: "/inbox", label: "Agent Inbox", icon: "📥" },
  { to: "/ticket", label: "Ticket", icon: "🎫" },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-none flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border px-4 py-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md2 bg-accent/15 text-sm text-accent">
          🎫
        </div>
        <div>
          <p className="text-sm font-semibold leading-none text-slate-100">
            Ticket Demo
          </p>
          <p className="text-[11px] leading-none text-muted mt-0.5">
            Workflow visualizer
          </p>
        </div>
      </div>

      <nav className="flex flex-col gap-1 px-3 py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-md2 px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent/15 text-accent"
                  : "text-muted hover:bg-surfaceHover hover:text-slate-100"
              }`
            }
          >
            <span className="text-base leading-none">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-1 flex-1 overflow-y-auto scrollbar-thin px-3 pb-4">
        <WorkflowProgress />
      </div>

      <div className="border-t border-border px-4 py-3 text-[11px] text-muted">
        Demo only · not production UI
      </div>
    </aside>
  );
}
