import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, STAGES } from "../../store/store";
import { Modal, Field, inputCls, btn, useToast } from "../../Components/ui";
import { money } from "../../utils/auth";

const empty = { title: "", client: "", value: "", stage: "Prospect" };

export default function Deals() {
  const deals = useSelector((s) => s.deals);
  const customers = useSelector((s) => s.customers);
  const dispatch = useDispatch();
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [toast, notify] = useToast();

  const save = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!(Number(form.value) > 0)) e.value = "Enter a value greater than 0";
    setErrors(e);
    if (Object.keys(e).length) return;
    const data = { ...form, value: Number(form.value) };
    dispatch(form.id ? actions.deals.update(data) : actions.deals.add(data));
    notify("Deal saved");
    setForm(null);
  };

  const remove = (d) => { if (window.confirm(`Delete deal "${d.title}"?`)) { dispatch(actions.deals.remove(d.id)); notify("Deal deleted"); } };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Sales Pipeline</h2>
        <button className={btn} onClick={() => { setErrors({}); setForm(empty); }}>+ Add Deal</button>
      </div>
      <p className="text-sm text-gray-500 mb-3">Drag a deal card into another column to change its stage.</p>

      <div className="grid grid-cols-2 xl:grid-cols-5 gap-3">
        {STAGES.map((stage) => {
          const col = deals.filter((d) => d.stage === stage);
          return (
            <div key={stage} onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => dispatch(actions.deals.update({ id: e.dataTransfer.getData("id"), stage }))}
              className="bg-gray-200 rounded-xl p-3 min-h-72">
              <div className="flex justify-between mb-1"><h3 className="font-semibold">{stage}</h3><span className="text-sm text-gray-500">{col.length}</span></div>
              <p className="text-xs text-gray-500 mb-3">{money(col.reduce((a, d) => a + d.value, 0))}</p>
              {col.map((d) => (
                <div key={d.id} draggable onDragStart={(e) => e.dataTransfer.setData("id", d.id)} className="bg-white p-3 rounded-lg shadow-sm mb-2 cursor-grab">
                  <p className="font-medium text-sm">{d.title}</p>
                  <p className="text-xs text-gray-500">{d.client || "No client"}</p>
                  <p className="text-sm font-semibold mt-1">{money(d.value)}</p>
                  <div className="text-xs mt-2 space-x-3">
                    <button onClick={() => { setErrors({}); setForm(d); }} className="text-purple-600">Edit</button>
                    <button onClick={() => remove(d)} className="text-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {deals.length === 0 && <p className="text-center text-gray-400 mt-6">No deals yet. Click "Add Deal" to create your first one.</p>}

      {form && (
        <Modal title={form.id ? "Edit Deal" : "Add Deal"} onClose={() => setForm(null)}>
          <div className="space-y-3">
            <Field label="Title" error={errors.title}><input className={inputCls} value={form.title} onChange={set("title")} /></Field>
            <Field label="Client">
              <input className={inputCls} list="clients" value={form.client} onChange={set("client")} placeholder="Pick a customer or type" />
              <datalist id="clients">{customers.map((c) => <option key={c.id} value={c.name} />)}</datalist>
            </Field>
            <Field label="Value (₹)" error={errors.value}><input type="number" className={inputCls} value={form.value} onChange={set("value")} /></Field>
            <Field label="Stage"><select className={inputCls} value={form.stage} onChange={set("stage")}>{STAGES.map((s) => <option key={s}>{s}</option>)}</select></Field>
            <button className={btn + " w-full"} onClick={save}>Save</button>
          </div>
        </Modal>
      )}
      {toast}
    </div>
  );
}
