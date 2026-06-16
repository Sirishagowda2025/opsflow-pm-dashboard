<div align="center">

# OpsFlow
### AI-Powered Project Operations Dashboard

**Built to simulate Google Operations Center workflows —**
**not because I was asked to, but because I wanted to prove I already think like a PM.**

[**→ Try it live**](https://steadyflow-desk.lovable.app) · [LinkedIn](https://www.linkedin.com/in/sirisha-d/) · [GitHub](https://github.com/Sirishagowda2025)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Lovable](https://img.shields.io/badge/Built%20with-Lovable-ff69b4?style=flat)
![Status](https://img.shields.io/badge/Status-Live-22C55E?style=flat)

</div>

---

## The Problem I Was Solving

While preparing for the **Google Operations Center PM Apprenticeship**, I read the JD carefully.

The role asks apprentices to learn how to:
- Distil data into actionable takeaways
- Coordinate resources and manage project risks
- Share documentation and reports with stakeholders
- Track scope, timelines, and outcomes
- Make data-backed recommendations

I didn't want to just say I could do these things in a cover letter.

**So I built a tool that does all of them.**

OpsFlow is a live project management dashboard where every feature was designed by mapping it to a specific GOC responsibility. It's not a tutorial project. It's a working answer to the question *"can you think like an operations PM?"*

---

## What It Does

### The Dashboard
The moment you open OpsFlow, you see what matters:

- **4 live stat cards** — total tasks, in-progress count, high-risk items, completed tasks. All calculated in real time from your task data.
- **Active task list** — every task with priority, status badge, deadline, and risk flag visible at a glance
- **Project health panel** — completion percentage, overdue count, and high-risk count. The number that tells you whether the project is healthy or not.

> *This is what a GOC PM sees when they open a project — not raw data, distilled signals.*

---

### Task Management
Create and manage operational tasks with the fields that actually matter in an ops context:

| Field | Why it matters |
|---|---|
| **Title** | Clear task ownership |
| **Status** | To Do / In Progress / Done — pipeline visibility |
| **Priority** | High / Medium / Low — resource allocation signal |
| **Deadline** | Overdue tasks surface automatically in red |
| **Risk Flag** | One toggle — task moves to the Risks page instantly |
| **Description** | Context for handoffs and documentation |

Tasks are fully editable via a slide-in panel. No page reloads, no friction.

---

### Risk Tracker
Every task flagged as a risk surfaces automatically on the **Risks page** — no manual filtering, no spreadsheet sorting.

Each risk card shows:
- Task name and description
- Priority level
- Deadline (highlighted red if overdue)
- Direct link back to edit the task

> *In a real GOC context, this is the escalation view — what you'd share with a Team Lead before end of day.*

---

### AI Report Generation
This is the feature I'm most proud of.

Click **Generate Report** and OpsFlow reads the live task board — not a template, not hardcoded text — and produces a structured stakeholder report with three sections:

**WEEKLY UPDATE**
Plain-English summary of project status. How many tasks active, what's on track, what needs attention. References actual task counts and overdue items.

**TOP RISKS**
Pulls every risk-flagged task and every overdue item. Names them specifically. Tells you the impact and what to do about it.

**RECOMMENDATIONS**
Three specific, actionable next steps — generated from the actual state of your tasks. References real task names, not generic advice.

The report changes every time you add, edit, or complete a task. It reflects reality.

> *This is the "distil data for actionable takeaways" requirement from the JD — automated.*

One click → copy to clipboard → paste into an email to your stakeholders.

---

### CSV Export
Export the full task list as a `.csv` file that opens directly in **Google Sheets** — the tool GOC teams use daily.

---

## Feature → JD Mapping

I built every feature by asking: *"Which line in the GOC JD does this solve?"*

| GOC Apprenticeship Responsibility | OpsFlow Feature |
|---|---|
| Distil data for actionable takeaways | AI report reads live task data, not a template |
| Identify and manage project risks | Risk flag toggle → instant Risks page |
| Share documentation with project teams | Copy report to clipboard + CSV → Google Sheets |
| Track project scope, timeframes, outcomes | Deadline tracker + real-time completion % |
| Data-backed recommendations | Report generates 3 specific actions per session |
| Coordinate internal resources | Task management with ownership + status tracking |
| Create and review reports | Full stakeholder report generated in one click |
| Communicate regularly with stakeholders | Structured Weekly Update section in every report |

---

## Tech Stack

| | Technology | Decision |
|---|---|---|
| **Framework** | React + TypeScript | Type safety — fewer bugs in a PM tool where data accuracy matters |
| **Styling** | Tailwind CSS | Rapid iteration — I rebuilt the UI three times to get it right |
| **Icons** | Lucide React | Consistent, clean icon set that doesn't distract from data |
| **Report Engine** | Custom JS generator | Reads live task state on every call — dynamic, not static |
| **Deploy** | Lovable + CDN | Live in under 5 minutes, zero DevOps overhead |

---

## What I Learned Building This

**1. PM thinking is system thinking.**
Every feature I added created a ripple — adding a risk flag meant I needed a Risks page, which meant I needed a risk count on the dashboard, which meant the AI report needed to reference it. I learned to think in systems, not features.

**2. The gap between "works" and "useful" is enormous.**
The first version worked. The fifth version was useful. I rebuilt the UI three times — dark theme → too heavy, pure white → too flat, warm off-white with clean typography → right. The difference was asking "would a PM actually use this?" not "does this render correctly?"

**3. Data without context is noise.**
The hardest part of the AI report wasn't generating text — it was making it specific. Generic advice is useless. A report that says *"Prioritise the APAC onboarding task — it's overdue and high priority"* is useful. That's the difference between data and insight.

---
## Run Locally

```bash
git clone https://github.com/Sirishagowda2025/opsflow-pm-dashboard
cd opsflow-pm-dashboard
npm install
npm run dev
```

No environment variables needed. No API keys. Opens at `localhost:5173`.

---

<div align="center">

*Built by **Sirisha D** — Bengaluru, India · Jun 2026*

[![LinkedIn](https://img.shields.io/badge/Connect-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sirisha-d/)
[![Live Demo](https://img.shields.io/badge/Try%20OpsFlow-Live-22C55E?style=flat)](https://steadyflow-desk.lovable.app)
[![GitHub](https://img.shields.io/badge/More%20Projects-GitHub-181717?style=flat&logo=github)](https://github.com/Sirishagowda2025)

</div>

[![LinkedIn](https://img.shields.io/badge/Connect-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sirisha-d/)

</div>
