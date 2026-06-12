import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useTasks, isOverdue, type Task, type Status, type Priority } from "@/lib/tasks-context";
import { StatusBadge, PriorityBadge, RiskPill } from "@/components/ui-bits";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — OpsFlow" },
      { name: "description", content: "All operations tasks with status, priority, and deadlines." },
    ],
  }),
  component: TasksPage,
});

type Draft = Omit<Task, "id">;
const emptyDraft: Draft = {
  title: "",
  status: "To Do",
  priority: "Medium",
  deadline: new Date().toISOString().slice(0, 10),
  risk: false,
  description: "",
};

function TasksPage() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [hoverId, setHoverId] = useState<number | null>(null);

  const openAdd = () => {
    setEditingId(null);
    setDraft(emptyDraft);
    setPanelOpen(true);
  };
  const openEdit = (t: Task) => {
    setEditingId(t.id);
    const { id: _id, ...rest } = t;
    setDraft(rest);
    setPanelOpen(true);
  };
  const save = () => {
    if (!draft.title.trim()) return;
    if (editingId == null) addTask(draft);
    else updateTask(editingId, draft);
    setPanelOpen(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 600, color: "var(--text-primary)" }}>Tasks</h1>
        <button
          onClick={openAdd}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "#1A1A1A",
            color: "white",
            fontSize: 13,
            fontWeight: 500,
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1A1A1A")}
        >
          <Plus size={14} />
          Add Task
        </button>
      </div>

      <div
        style={{
          background: "white",
          border: "1px solid var(--border)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#FAFAF9", borderBottom: "1px solid var(--border-strong)" }}>
              {["Title", "Status", "Priority", "Deadline", "Risk", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--text-muted)",
                    padding: "11px 16px",
                    textAlign: "left",
                    fontWeight: 500,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => {
              const overdue = isOverdue(t.deadline, t.status);
              return (
                <tr
                  key={t.id}
                  onMouseEnter={() => setHoverId(t.id)}
                  onMouseLeave={() => setHoverId(null)}
                  style={{
                    borderBottom: "1px solid #F5F4F0",
                    background: hoverId === t.id ? "#FAFAF8" : "white",
                  }}
                >
                  <td
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      padding: "13px 16px",
                    }}
                  >
                    {t.title}
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <StatusBadge status={t.status} />
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <PriorityBadge priority={t.priority} />
                  </td>
                  <td
                    style={{
                      padding: "13px 16px",
                      fontSize: 13,
                      color: overdue ? "#EF4444" : "var(--text-secondary)",
                    }}
                  >
                    {t.deadline}
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    {t.risk ? <RiskPill /> : <span style={{ color: "var(--text-muted)" }}>—</span>}
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        visibility: hoverId === t.id ? "visible" : "hidden",
                      }}
                    >
                      <IconBtn onClick={() => openEdit(t)} hoverColor="var(--text-primary)">
                        <Pencil size={15} />
                      </IconBtn>
                      <IconBtn onClick={() => deleteTask(t.id)} hoverColor="#EF4444">
                        <Trash2 size={15} />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {panelOpen && (
        <TaskPanel
          draft={draft}
          setDraft={setDraft}
          onSave={save}
          onClose={() => setPanelOpen(false)}
          editing={editingId != null}
        />
      )}
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  hoverColor,
}: {
  children: React.ReactNode;
  onClick: () => void;
  hoverColor: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        border: "none",
        padding: 0,
        color: "var(--text-muted)",
        cursor: "pointer",
        display: "inline-flex",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
    >
      {children}
    </button>
  );
}

function TaskPanel({
  draft,
  setDraft,
  onSave,
  onClose,
  editing,
}: {
  draft: Draft;
  setDraft: (d: Draft) => void;
  onSave: () => void;
  onClose: () => void;
  editing: boolean;
}) {
  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "var(--text-muted)",
    marginBottom: 6,
    display: "block",
  };
  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#FAFAF9",
    border: "1px solid var(--border)",
    borderRadius: 6,
    padding: "9px 12px",
    fontSize: 14,
    color: "var(--text-primary)",
    boxSizing: "border-box",
  };
  const focus = (e: React.FocusEvent<HTMLElement>) =>
    (e.currentTarget.style.borderColor = "#1A1A1A");
  const blur = (e: React.FocusEvent<HTMLElement>) =>
    (e.currentTarget.style.borderColor = "var(--border)");

  return (
    <>
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.04)", zIndex: 40 }}
      />
      <aside
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          height: "100vh",
          width: 420,
          background: "white",
          borderLeft: "1px solid var(--border)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)" }}>
            {editing ? "Edit Task" : "Add Task"}
          </span>
          <button
            onClick={onClose}
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
            <X size={18} />
          </button>
        </div>

        <div
          style={{
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            flex: 1,
            overflowY: "auto",
          }}
        >
          <div>
            <label style={labelStyle}>Title</label>
            <input
              style={inputStyle}
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              onFocus={focus}
              onBlur={blur}
            />
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              onFocus={focus}
              onBlur={blur}
            />
          </div>

          <div>
            <label style={labelStyle}>Status</label>
            <select
              style={inputStyle}
              value={draft.status}
              onChange={(e) => setDraft({ ...draft, status: e.target.value as Status })}
              onFocus={focus}
              onBlur={blur}
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Priority</label>
            <select
              style={inputStyle}
              value={draft.priority}
              onChange={(e) => setDraft({ ...draft, priority: e.target.value as Priority })}
              onFocus={focus}
              onBlur={blur}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Deadline</label>
            <input
              type="date"
              style={inputStyle}
              value={draft.deadline}
              onChange={(e) => setDraft({ ...draft, deadline: e.target.value })}
              onFocus={focus}
              onBlur={blur}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ ...labelStyle, marginBottom: 0 }}>Risk flag</span>
            <button
              onClick={() => setDraft({ ...draft, risk: !draft.risk })}
              style={{
                width: 36,
                height: 20,
                borderRadius: 999,
                background: draft.risk ? "#1A1A1A" : "#E5E5E5",
                position: "relative",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              aria-pressed={draft.risk}
            >
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: draft.risk ? 18 : 2,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "white",
                }}
              />
            </button>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            padding: "16px 24px",
            display: "flex",
            gap: 10,
          }}
        >
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: "white",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              height: 38,
              borderRadius: 6,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            style={{
              flex: 1,
              background: "#1A1A1A",
              border: "none",
              color: "white",
              height: 38,
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      </aside>
    </>
  );
}