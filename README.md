# Nerti — Financial Intelligence UI

> See what your money is doing before it moves.

Nerti is a production-grade frontend-only SaaS prototype for predictive financial visibility. Built with React, TypeScript, Tailwind CSS, Zustand, Recharts, and Framer Motion.

---

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Login

Use **any email and password** — authentication is mocked (Zustand, no backend).

---

## Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/about` | About page |
| `/login` | Login (mock) |
| `/signup` | Signup → onboarding |
| `/onboarding` | 4-step onboarding flow |
| `/dashboard` | Main dashboard |
| `/subscriptions` | Subscription tracker |
| `/insurance` | Insurance module |
| `/upload` | Bank statement upload (UI only) |
| `/profile` | Profile page |
| `/settings` | Notification + appearance settings |
| `/billing` | Plan and checkout UI |

---

## Stack

- **React 18** + **Vite** + **TypeScript**
- **Tailwind CSS** — dark/light mode via class strategy
- **Zustand** — auth, theme, subscriptions, insurance, alerts, onboarding
- **Recharts** — area, bar, pie charts
- **Framer Motion** — page transitions and micro-animations
- **Lucide React** — icons
- **date-fns** — date formatting

---

## Architecture

```
src/
  components/
    ui/         — Button, Input, Card, Badge, StatCard, Toggle, etc.
    layout/     — AppLayout (sidebar + topbar)
    charts/     — Recharts chart components
  data/
    mockData.ts — All mock subscriptions, insurance, alerts, activity
  pages/        — One file per route
  store/        — Zustand stores (auth, theme, subscriptions, insurance, alerts, onboarding)
  types/        — TypeScript interfaces
```

---

## Design system

- **Base**: deep navy `#04070f` background
- **Cards**: `#0d1628` with `#1a2d4a` borders
- **Accent**: blue `#3b82f6`
- **Typography**: Inter (UI) + JetBrains Mono (numbers/code)
- **No emojis** — icons only (Lucide)
- Dark mode default, light mode toggle preserved in localStorage

---

## Notes

- All data is mocked locally — no API calls, no backend
- Auth state is persisted in localStorage via Zustand persist
- File upload UI is fully simulated (no real parsing)
- Charts use simulated predictive data (2-month forward projection)
