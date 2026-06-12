import type { Status, Priority } from "@/lib/tasks-context";

export function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, { bg: string; color: string; border: string }> = {
    "To Do": { bg: "#F5F5F4", color: "#888888", border: "#E5E5E5" },
    "In Progress": { bg: "#EFF6FF", color: "#2563EB", border: "#BFDBFE" },
    Done: { bg: "#F0FDF4", color: "#16A34A", border: "#BBF7D0" },
  };
  const s = styles[status];
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        fontSize: 11,
        padding: "2px 8px",
        borderRadius: 6,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const styles: Record<Priority, { bg: string; color: string; border: string }> = {
    High: { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" },
    Medium: { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
    Low: { bg: "#F5F5F4", color: "#888888", border: "#E5E5E5" },
  };
  const s = styles[priority];
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        fontSize: 11,
        padding: "2px 8px",
        borderRadius: 6,
      }}
    >
      {priority}
    </span>
  );
}

export function RiskPill() {
  return (
    <span
      style={{
        background: "#FFFBEB",
        color: "#D97706",
        border: "1px solid #FDE68A",
        fontSize: 10,
        padding: "2px 7px",
        borderRadius: 4,
        whiteSpace: "nowrap",
      }}
    >
      Risk
    </span>
  );
}