import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Copy } from "lucide-react";
import { useTasks } from "@/lib/tasks-context";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — OpsFlow" },
      { name: "description", content: "AI-generated operations reports." },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const { tasks, setLastReport } = useTasks();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const flagged = tasks.filter((t) => t.risk).length;

  const generate = async () => {
    setError(null);
    const apiKey = localStorage.getItem("claude_api_key");
    if (!apiKey) {
      setError("Add your Claude API key in Settings first");
      return;
    }

    const taskSummary = tasks
      .map(
        (t) =>
          `- ${t.title} | Status: ${t.status} | Priority: ${t.priority} | Deadline: ${t.deadline} | Risk: ${t.risk ? "YES" : "No"}`,
      )
      .join("\n");

    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          messages: [
            {
              role: "user",
              content: `You are an operations project manager at Google Operations Center. \n\nAnalyse these tasks and generate a professional operations report with exactly 3 sections.\n\nTASKS:\n${taskSummary}\n\nFormat your response EXACTLY like this, with these exact headings:\n\nWEEKLY UPDATE\n\n[2-3 sentences summarising overall project status, what is on track, what needs attention]\n\nTOP RISKS\n\n[List the top 2-3 risks based on risk-flagged tasks and overdue deadlines. Each on a new line starting with a number and period]\n\nRECOMMENDATIONS\n\n[List 2-3 specific, actionable recommendations for the team. Each on a new line starting with a number and period]\n\nBe specific, professional, and concise. Reference actual task names. Do not add any other sections or commentary.`,
            },
          ],
        }),
      });
      const data = await response.json();
      if (!response.ok || !data?.content?.[0]?.text) {
        throw new Error("API error");
      }
      const reportText: string = data.content[0].text;
      setReport(reportText);
      const now = new Date();
      setLastReport(
        now.toLocaleString(undefined, {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    } catch {
      setError("Failed to generate report. Check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    if (report) navigator.clipboard?.writeText(report);
  };

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div
        style={{
          flex: 1,
          background: "white",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: 24,
          alignSelf: "flex-start",
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 500, color: "var(--text-primary)" }}>
          AI Operations Report
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            marginTop: 6,
            background: "#F5F4F0",
            color: "#888",
            border: "1px solid var(--border)",
            fontSize: 10,
            padding: "2px 8px",
            borderRadius: 4,
          }}
        >
          <Sparkles size={12} />
          Powered by Claude
        </span>
        <div style={{ borderTop: "1px solid var(--border)", margin: "20px 0" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            { label: "Total tasks", value: tasks.length },
            { label: "In progress", value: inProgress },
            { label: "Flagged risks", value: flagged },
          ].map((r) => (
            <div
              key={r.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid #F5F4F0",
              }}
            >
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{r.label}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-primary)" }}>
                {r.value}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={generate}
          disabled={loading}
          style={{
            marginTop: 20,
            width: "100%",
            height: 44,
            background: "#1A1A1A",
            color: "white",
            border: "none",
            borderRadius: 6,
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 500,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          <Sparkles size={14} />
          {loading ? "Generating..." : "Generate Report"}
        </button>
        {error && (
          <div style={{ marginTop: 12, fontSize: 12, color: "#EF4444" }}>{error}</div>
        )}
      </div>

      <div
        style={{
          flex: 2,
          background: "white",
          border: "1px solid var(--border)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#AAAAAA",
            }}
          >
            Report Output
          </span>
          <button
            onClick={copy}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              display: "inline-flex",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <Copy size={15} />
          </button>
        </div>
        <div
          style={{
            background: "#FAFAF9",
            borderTop: "1px solid var(--border)",
            padding: 24,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 13,
            lineHeight: 1.8,
            color: "var(--text-secondary)",
            minHeight: 360,
            whiteSpace: "pre-wrap",
          }}
        >
          {report ? (
            <FormattedReport text={report} />
          ) : (
            <span style={{ color: "var(--text-muted)" }}>
              Click 'Generate Report' to create an AI-powered operations summary...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function FormattedReport({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, i) => {
        if (/^[A-Z][A-Z\s]+$/.test(block.trim())) {
          return (
            <div
              key={i}
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#AAAAAA",
                marginTop: i === 0 ? 0 : 20,
                marginBottom: 8,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {block.trim()}
            </div>
          );
        }
        return (
          <p key={i} style={{ fontSize: 13, color: "#444444", lineHeight: 1.7, margin: "0 0 12px" }}>
            {block}
          </p>
        );
      })}
    </>
  );
}