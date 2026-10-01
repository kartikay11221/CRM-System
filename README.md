# Myapp CRM

A front-end Customer Relationship Management (CRM) dashboard built with **React 19**, **Redux Toolkit**, **React Router** and **Tailwind CSS 4**. Manage leads, customers, deals, and tasks from one admin dashboard, with a visual sales pipeline and an automatic activity log.

The app runs entirely in the browser. There is no backend, and all data is saved in `localStorage`.

---

## Features

### Authentication
- **Sign up** with name, email, gender and password (min. 8 characters, at least one uppercase letter and one special character, plus confirm-password check)
- **Sign in** with the saved credentials
- **Forgot / reset password** flow with a 4-digit OTP, a 60-second countdown and a resend option
- **Route guards**
  - `Protected` keeps the dashboard for logged-in users only
  - `PublicOnly` redirects logged-in users away from public pages
  - `ResetGuard` blocks the reset page until the OTP is verified
- Custom 404 page

### CRM Dashboard
| Module | What you can do |
|---|---|
| **Overview** | KPI cards (total leads, customers, open deals, won revenue, pending tasks, lead conversion %), bar charts for pipeline value by stage and leads by status, and recent activity |
| **Leads** | Add, edit, delete; search by name, email or company; filter by status, source and date; pagination; **convert a lead to a customer** in one click |
| **Customers** | Same CRUD, search, filters and pagination as leads |
| **Deals** | Kanban-style sales pipeline (Prospect → Proposal → Negotiation → Won → Lost) with **drag-and-drop** between stages and per-stage totals |
| **Tasks** | Create tasks with due date and priority, tick them off, filter by All / Pending / Done |
| **Activities** | Automatic log of every add, update and delete (keeps the latest 100 entries), with a clear-log option |
| **Profile** | View and edit admin details and change password (requires the current password) |

### Other details
- Form validation with inline error messages (email format, phone digits, deal value > 0, required fields)
- Toast notifications and delete confirmations
- Amounts formatted in Indian Rupees (₹, `en-IN`)
- Collapsible sidebar and a responsive layout
- CRM data persists across page refreshes

---

## Tech Stack

| Area | Technology |
|---|---|
| UI library | React 19 |
| Build tool | Vite 8 |
| State management | Redux Toolkit + React Redux |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Linting | ESLint 10 |
| Persistence | Browser `localStorage` / `sessionStorage` |

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended) and npm

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd Myapp

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## How to Use

1. Open the app and click **SignUp** to create the admin account.
2. **Login** with the same email and password.
3. Use the sidebar to add leads, convert them to customers, build your deal pipeline, and track tasks.
4. Check **Overview** for live stats and **Activities** for the history of your actions.

> **Forgot password?** Enter your registered email. Since there is no backend, the OTP is generated in the browser and stored in `sessionStorage` (see Limitations).

---

## Project Structure

```
Myapp/
├── public/
├── src/
│   ├── assets/              # Background images and video
│   ├── Components/
│   │   ├── Header.jsx
│   │   ├── Protected.jsx    # Route guard: logged-in users only
│   │   ├── PublicOnly.jsx   # Route guard: logged-out users only
│   │   ├── ResetGuard.jsx   # Route guard: OTP-verified users only
│   │   └── ui.jsx           # Shared UI: Modal, Badge, Pagination, Field, Bars chart, Toast
│   ├── Pages/
│   │   ├── Home.jsx
│   │   ├── Signin.jsx
│   │   ├── Signup.jsx
│   │   ├── ForgotPass.jsx
│   │   ├── ResetPass.jsx
│   │   ├── Dashboard.jsx    # Layout with sidebar and nested routes
│   │   ├── PageNotFound.jsx
│   │   └── Crm/
│   │       ├── Overview.jsx
│   │       ├── Contacts.jsx # Reused for both Leads and Customers
│   │       ├── Deals.jsx
│   │       ├── Tasks.jsx
│   │       ├── Activities.jsx
│   │       └── Profile.jsx
│   ├── store/
│   │   └── store.js         # Redux slices, activity-logger middleware, localStorage sync
│   ├── utils/
│   │   └── auth.js          # Admin helpers, currency and date formatters
│   ├── Style/style.css
│   ├── App.jsx              # Routes
│   └── main.jsx             # Entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## Architecture Notes

- **Generic CRUD slice factory**: `leads`, `customers`, `deals` and `tasks` are all created from one `crud()` helper in `store.js`, giving each `add`, `update` and `remove` actions with auto-generated IDs and timestamps.
- **Activity logger middleware**: a custom Redux middleware watches those actions and writes a human-readable entry to the activity log, so no page needs to log anything manually.
- **Reusable `Contacts` page**: Leads and Customers share one component, configured through `mod`, `title` and `statuses` props.
- **Persistence**: the store subscribes to changes and saves state to `localStorage` under the `crmData` key; it is reloaded as `preloadedState` on startup.

---

## Limitations

This project is built for learning and demonstration, not production use.

- **No backend or database.** Data lives in the browser, so clearing site data erases it, and it is not shared across devices.
- **Passwords are stored in plain text** in `localStorage` (`userInfo`). Do not use real passwords.
- **Authentication is client-side only** (an `isLogin` flag in `localStorage`), so it offers no real security.
- **OTP emails are not actually sent.** The OTP is generated locally for demo purposes.
- **Single admin account.** Signing up again overwrites the previous account.

---

## Roadmap Ideas

- Connect a real backend (Node/Express, MongoDB or similar) with JWT authentication
- Hash passwords and send real OTP emails
- Export leads and customers to CSV
- Add charts for monthly revenue trends
- Add unit tests (Vitest and React Testing Library)
- Add role-based access (Admin / Sales rep)

---

## License

This project is open source and available under the [MIT License](LICENSE).
