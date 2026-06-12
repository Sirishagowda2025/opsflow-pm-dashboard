import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { useTasks } from "@/lib/tasks-context";
import { PriorityBadge } from "@/components/ui-bits";

export const Route = createFileRoute("/risks")({
  head: () => ({
    meta: [
      { title: "Risks — OpsFlow" },
      { name: "description", content: "Tasks flagged as high risk." },
    ],
  }),
  component: RisksPage,
});

function RisksPage() {
  const { tasks } = useTasks();
  const risks = tasks.filter((t) => t.risk);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: "var(--text-primary)" }}>Risks</h1>
        <span
          style={{
            background: "#FEF2F2",
            color: "#DC2626",
            border: "1px solid #FECACA",
            fontSize: 12,
            padding: "2px 8px",
            borderRadius: 6,
          }}
        >
          {risks.length}
        </span>
      </div>

      {risks.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 20px",
            gap: 8,
          }}
        >
          <AlertTriangle size={32} color="#D1D5DB" />
          <div style={{ fontSize: 14, color: "#888" }}>No risks flagged</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            Mark tasks as high risk to track them here
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {risks.map((t) => (
            <div
              key={t.id}
              style={{
                background: "white",
                border: "1px solid var(--border)",
                borderLeft: "3px solid #EF4444",
                borderRadius: 8,
                padding: "18px 20px",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>
                {t.title}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>
                {t.description}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 14,
                }}
              >
                <PriorityBadge priority={t.priority} />
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{t.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}