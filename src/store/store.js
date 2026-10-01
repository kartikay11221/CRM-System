import { configureStore, createSlice, nanoid } from "@reduxjs/toolkit";

const crud = (name) =>
  createSlice({
    name,
    initialState: [],
    reducers: {
      add: {
        reducer: (s, a) => { s.unshift(a.payload); },
        prepare: (d) => ({ payload: { id: nanoid(), createdAt: new Date().toISOString(), ...d } }),
      },
      update: (s, a) => {
        const i = s.findIndex((x) => x.id === a.payload.id);
        if (i > -1) s[i] = { ...s[i], ...a.payload };
      },
      remove: (s, a) => s.filter((x) => x.id !== a.payload),
    },
  });

const leads = crud("leads");
const customers = crud("customers");
const deals = crud("deals");
const tasks = crud("tasks");

const activities = createSlice({
  name: "activities",
  initialState: [],
  reducers: {
    log: {
      reducer: (s, a) => { s.unshift(a.payload); if (s.length > 100) s.pop(); },
      prepare: (text) => ({ payload: { id: nanoid(), text, at: new Date().toISOString() } }),
    },
    clear: () => [],
  },
});

export const actions = {
  leads: leads.actions, customers: customers.actions,
  deals: deals.actions, tasks: tasks.actions,
};
export const { log, clear } = activities.actions;
export const STAGES = ["Prospect", "Proposal", "Negotiation", "Won", "Lost"];

// Auto-writes an Activity entry whenever something is added / updated / deleted
const logger = (api) => (next) => (action) => {
  const m = /^(leads|customers|deals|tasks)\/(add|update|remove)$/.exec(action.type);
  const before = m && api.getState()[m[1]];
  const res = next(action);
  if (m) {
    const [, mod, op] = m;
    const p = action.payload;
    const old = op === "add" ? {} : before.find((x) => x.id === (p.id || p)) || {};
    const item = op === "remove" ? old : { ...old, ...p };
    const verb = { add: "Added", update: "Updated", remove: "Deleted" }[op];
    api.dispatch(log(`${verb} ${mod.slice(0, -1)}: ${item.name || item.title || ""}`));
  }
  return res;
};

let saved = {};
try { saved = JSON.parse(localStorage.getItem("crmData")) || {}; } catch { /* ignore */ }

const store = configureStore({
  reducer: {
    leads: leads.reducer, customers: customers.reducer, deals: deals.reducer,
    tasks: tasks.reducer, activities: activities.reducer,
  },
  preloadedState: saved,
  middleware: (gdm) => gdm().concat(logger),
});

// keep CRM data in localStorage so it survives refresh
store.subscribe(() => localStorage.setItem("crmData", JSON.stringify(store.getState())));

export default store;
