import { createFileRoute } from "@tanstack/react-router";
import { useTasks, isOverdue } from "@/lib/tasks-context";
import { StatusBadge, RiskPill } from "@/components/ui-bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — OpsFlow" },
      { name: "description", content: "Operations dashboard with task status and project health." },
    ],
  }),
  component: Dashboard,
});

const cardBase: React.CSSProperties = {
  background: "white",
  border: "1px solid var(--border)",
  borderRadius: 8,
};

function StatCard({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div
      style={{
        ...cardBase,
        padding: "20px 24px",
        borderLeft: `3px solid ${accent}`,
        flex: 1,
      }}
    >
      <div
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--text-muted)",
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 36, fontWeight: 600, color: "var(--text-primary)", marginTop: 6 }}>
        {value}
      </div>
    </div>
  );
}

function Dashboard() {
  const { tasks, lastReport } = useTasks();
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Done").length;
  const highRisk = tasks.filter((t) => t.risk).length;
  const overdue = tasks.filter((t) => isOverdue(t.deadline, t.status)).length;
  const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  const priorityColor: Record<string, string> = {
    High: "#EF4444",
    Medium: "#F59E0B",
    Low: "#CBD5E1",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 20 }}>
        <StatCard label="Total Tasks" value={tasks.length} accent="#CBD5E1" />
        <StatCard label="In Progress" value={inProgress} accent="#3B82F6" />
        <StatCard label="High Risk" value={highRisk} accent="#EF4444" />
        <StatCard label="Completed" value={completed} accent="#22C55E" />
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ ...cardBase, flex: 1.8 }}>
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--border)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
            }}
          >
            Active Tasks
          </div>
          {tasks
            .filter((t) => t.status !== "Done")
            .map((t) => (
              <div
                key={t.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "13px 20px",
                  borderBottom: "1px solid #F5F4F0",
                  gap: 12,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAF8")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: priorityColor[t.priority],
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.title}
                </div>
                <StatusBadge status={t.status} />
                <span
                  style={{
                    fontSize: 12,
                    color: isOverdue(t.deadline, t.status) ? "#EF4444" : "var(--text-muted)",
                  }}
                >
                  {t.deadline}
                </span>
                {t.risk && <RiskPill />}
              </div>
            ))}
        </div>

        <div style={{ ...cardBase, flex: 1 }}>
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--border)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
            }}
          >
            Project Health
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ fontSize: 44, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1 }}>
              {percent}%
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, marginBottom: 16 }}>
              tasks completed
            </div>
            <div
              style={{
                background: "#F0EFEB",
                height: 4,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div style={{ width: `${percent}%`, height: "100%", background: "#1A1A1A" }} />
            </div>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column" }}>
              {[
                { label: "Overdue", value: String(overdue) },
                { label: "High risk", value: String(highRisk) },
                { label: "Last report", value: lastReport ?? "—" },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid #F5F4F0",
                  }}
                >
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{row.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
