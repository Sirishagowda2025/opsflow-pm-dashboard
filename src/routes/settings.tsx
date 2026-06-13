import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — OpsFlow" },
      { name: "description", content: "Profile, project, and API settings." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [name, setName] = useState("Sirisha D");
  const [role, setRole] = useState("PM Apprentice");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("OpsFlow — GOC Operations");
  const [teamSize, setTeamSize] = useState("1");
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState<string>("");

  useEffect(() => {
    const k = localStorage.getItem("claude_api_key") ?? "";
    setApiKey(k);
    setSavedKey(k);
  }, []);

  const handleSave = () => {
    localStorage.setItem("claude_api_key", apiKey);
    setSavedKey(apiKey);
  };

  return (
    <div
      style={{
        background: "white",
        border: "1px solid var(--border)",
        borderRadius: 8,
        padding: 24,
        maxWidth: 760,
      }}
    >
      <Section title="Profile">
        <Row>
          <Field label="Name" value={name} onChange={setName} />
          <Field label="Role" value={role} onChange={setRole} />
        </Row>
        <Field label="Email" value={email} onChange={setEmail} />
      </Section>

      <Section title="Project">
        <Field label="Project Name" value={project} onChange={setProject} />
        <Field label="Team size" value={teamSize} onChange={setTeamSize} />
      </Section>

      <Section title="API" last>
        <Field
          label="Claude API Key"
          value={apiKey}
          onChange={setApiKey}
          type="password"
          placeholder="sk-ant-..."
        />
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: -10 }}>
          Used to generate AI reports. Your key is stored locally.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: -6 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: savedKey ? "#22C55E" : "#EF4444",
            }}
          />
          <span style={{ fontSize: 11, color: savedKey ? "#22C55E" : "#EF4444" }}>
            {savedKey ? "API key saved" : "No API key"}
          </span>
        </div>
      </Section>

      <button
        onClick={handleSave}
        style={{
          marginTop: 20,
          background: "#1A1A1A",
          color: "white",
          padding: "9px 20px",
          borderRadius: 6,
          fontSize: 13,
          border: "none",
          cursor: "pointer",
        }}
      >
        Save changes
      </button>
    </div>
  );
}

function Section({
  title,
  children,
  last,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div style={{ marginBottom: last ? 0 : 24 }}>
      <div
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "var(--text-primary)",
          paddingBottom: 10,
          borderBottom: "1px solid var(--border)",
          marginBottom: 16,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", gap: 16 }}>{children}</div>;
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div style={{ flex: 1 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--text-muted)",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: "#FAFAF9",
          border: "1px solid var(--border)",
          borderRadius: 6,
          padding: "9px 12px",
          fontSize: 14,
          color: "var(--text-primary)",
          boxSizing: "border-box",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#1A1A1A")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      />
    </div>
  );
}