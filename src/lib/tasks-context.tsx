import { createContext, useContext, useState, type ReactNode } from "react";

export type Status = "To Do" | "In Progress" | "Done";
export type Priority = "High" | "Medium" | "Low";

export interface Task {
  id: number;
  title: string;
  status: Status;
  priority: Priority;
  deadline: string;
  risk: boolean;
  description: string;
}

const initialTasks: Task[] = [
  { id: 1, title: "Onboard APAC support team — Q3 rollout", status: "In Progress", priority: "High", deadline: "2026-06-25", risk: true, description: "Coordinate onboarding for 12 new agents across Singapore and Sydney offices." },
  { id: 2, title: "Stakeholder report — EMEA operations review", status: "To Do", priority: "High", deadline: "2026-06-18", risk: false, description: "Compile Q2 performance metrics and prepare executive summary for EMEA leadership." },
  { id: 3, title: "Document escalation process for Tier-2 issues", status: "In Progress", priority: "Medium", deadline: "2026-06-30", risk: false, description: "Write SOP for escalation workflows between Tier-1 and Tier-2 support teams." },
  { id: 4, title: "Coordinate cross-functional sync — product & ops", status: "Done", priority: "Medium", deadline: "2026-06-10", risk: false, description: "Facilitate weekly alignment meeting between product managers and operations leads." },
  { id: 5, title: "Review SLA compliance metrics — July", status: "To Do", priority: "High", deadline: "2026-06-15", risk: true, description: "Audit SLA adherence rates and flag breaches for stakeholder review." },
  { id: 6, title: "Update onboarding documentation — new workflow", status: "In Progress", priority: "Low", deadline: "2026-07-05", risk: false, description: "Revise onboarding docs to reflect updated tools and process changes from Q2." },
];

interface Ctx {
  tasks: Task[];
  addTask: (t: Omit<Task, "id">) => void;
  updateTask: (id: number, t: Omit<Task, "id">) => void;
  deleteTask: (id: number) => void;
  lastReport: string | null;
  setLastReport: (s: string | null) => void;
}

const TasksContext = createContext<Ctx | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [lastReport, setLastReport] = useState<string | null>(null);

  const addTask = (t: Omit<Task, "id">) =>
    setTasks((prev) => [...prev, { ...t, id: Math.max(0, ...prev.map((p) => p.id)) + 1 }]);

  const updateTask = (id: number, t: Omit<Task, "id">) =>
    setTasks((prev) => prev.map((p) => (p.id === id ? { ...t, id } : p)));

  const deleteTask = (id: number) => setTasks((prev) => prev.filter((p) => p.id !== id));

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask, lastReport, setLastReport }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within TasksProvider");
  return ctx;
}

export function isOverdue(deadline: string, status: Status) {
  if (status === "Done") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(deadline) < today;
}