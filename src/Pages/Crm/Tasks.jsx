import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/store";
import { Badge, Empty, Field, inputCls, btn, Modal, useToast } from "../../Components/ui";
import { dateStr } from "../../utils/auth";

const empty = { title: "", due: "", priority: "Medium", done: false };

export default function Tasks() {
  const tasks = useSelector((s) => s.tasks);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [toast, notify] = useToast();

  const shown = tasks.filter((t) => filter === "All" || (filter === "Done" ? t.done : !t.done));

  const save = () => {
    if (!form.title.trim()) return setError("Title is required");
    setError("");
    dispatch(form.id ? actions.tasks.update(form) : actions.tasks.add(form));
    notify("Task saved");
    setForm(null);
  };
  const remove = (t) => { if (window.confirm("Delete this task?")) { dispatch(actions.tasks.remove(t.id)); notify("Task deleted"); } };

  return (
    <div className="max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button className={btn} onClick={() => { setError(""); setForm(empty); }}>+ Add Task</button>
      </div>
      <div className="flex gap-2 mb-4">
        {["All", "Pending", "Done"].map((x) => (
          <button key={x} onClick={() => setFilter(x)} className={`px-3 py-1 rounded-full border ${filter === x ? "bg-purple-600 text-white" : "bg-white"}`}>{x}</button>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm divide-y">
        {shown.map((t) => (
          <div key={t.id} className="flex items-center gap-3 p-3">
            <input type="checkbox" checked={t.done} onChange={() => dispatch(actions.tasks.update({ id: t.id, done: !t.done }))} />
            <div className="flex-1">
              <p className={t.done ? "line-through text-gray-400" : ""}>{t.title}</p>
              <p className="text-xs text-gray-500">Due: {dateStr(t.due)}</p>
            </div>
            <Badge text={t.priority} />
            <button onClick={() => { setError(""); setForm(t); }} className="text-purple-600 text-sm">Edit</button>
            <button onClick={() => remove(t)} className="text-red-600 text-sm">Delete</button>
          </div>
        ))}
        {shown.length === 0 && <Empty text={tasks.length ? "No tasks in this view" : "No tasks yet"} />}
      </div>

      {form && (
        <Modal title={form.id ? "Edit Task" : "Add Task"} onClose={() => setForm(null)}>
          <div className="space-y-3">
            <Field label="Title" error={error}><input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
            <Field label="Due date"><input type="date" className={inputCls} value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} /></Field>
            <Field label="Priority">
              <select className={inputCls} value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                {["High", "Medium", "Low"].map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
            <button className={btn + " w-full"} onClick={save}>Save</button>
          </div>
        </Modal>
      )}
      {toast}
    </div>
  );
}
