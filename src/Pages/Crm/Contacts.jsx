import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/store";
import { Modal, Badge, Pagination, Field, inputCls, btn, Empty, useToast } from "../../Components/ui";
import { dateStr } from "../../utils/auth";

const SOURCES = ["Website", "Referral", "Email", "Event", "Other"];
const PER_PAGE = 6;

export default function Contacts({ mod, title, statuses }) {
  const list = useSelector((s) => s[mod]);
  const dispatch = useDispatch();
  const A = actions[mod];
  const empty = { name: "", email: "", phone: "", company: "", status: statuses[0], source: SOURCES[0] };
  const [f, setF] = useState({ q: "", status: "", source: "", from: "" });
  const [page, setPage] = useState(1);
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [toast, notify] = useToast();

  const setFilter = (k, v) => { setF({ ...f, [k]: v }); setPage(1); };
  const filtered = list.filter((x) =>
    (x.name + x.email + x.company).toLowerCase().includes(f.q.toLowerCase()) &&
    (!f.status || x.status === f.status) && (!f.source || x.source === f.source) &&
    (!f.from || x.createdAt.slice(0, 10) >= f.from));
  const pages = Math.ceil(filtered.length / PER_PAGE);
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const save = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (form.phone && !/^\d{7,15}$/.test(form.phone)) e.phone = "Digits only (7-15)";
    setErrors(e);
    if (Object.keys(e).length) return;
    dispatch(form.id ? A.update(form) : A.add(form));
    notify(form.id ? "Updated successfully" : "Added successfully");
    setForm(null);
  };

  const remove = (x) => {
    if (window.confirm(`Delete ${x.name}?`)) { dispatch(A.remove(x.id)); notify("Deleted"); }
  };

  const convert = (x) => {
    dispatch(actions.customers.add({ name: x.name, email: x.email, phone: x.phone, company: x.company, status: "Active", source: x.source }));
    dispatch(A.update({ id: x.id, status: "Converted" }));
    notify("Converted to customer");
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title} <span className="text-gray-400 text-base">({list.length})</span></h2>
        <button className={btn} onClick={() => { setErrors({}); setForm(empty); }}>+ Add {title.slice(0, -1)}</button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <input value={f.q} onChange={(e) => setFilter("q", e.target.value)} placeholder="Search name, email, company..." className={inputCls + " !w-64 !mt-0"} />
        <select value={f.status} onChange={(e) => setFilter("status", e.target.value)} className={inputCls + " !w-40 !mt-0"}>
          <option value="">All status</option>{statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={f.source} onChange={(e) => setFilter("source", e.target.value)} className={inputCls + " !w-40 !mt-0"}>
          <option value="">All sources</option>{SOURCES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <input type="date" value={f.from} onChange={(e) => setFilter("from", e.target.value)} className={inputCls + " !w-44 !mt-0"} title="Created from" />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>{["Name", "Email", "Phone", "Company", "Source", "Status", "Created", ""].map((h) => <th key={h} className="p-3">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((x) => (
              <tr key={x.id} className="border-t">
                <td className="p-3 font-medium">{x.name}</td><td className="p-3">{x.email}</td>
                <td className="p-3">{x.phone || "-"}</td><td className="p-3">{x.company || "-"}</td>
                <td className="p-3">{x.source}</td><td className="p-3"><Badge text={x.status} /></td>
                <td className="p-3">{dateStr(x.createdAt)}</td>
                <td className="p-3 text-right whitespace-nowrap space-x-3">
                  {mod === "leads" && x.status !== "Converted" && <button onClick={() => convert(x)} className="text-green-600">Convert</button>}
                  <button onClick={() => { setErrors({}); setForm(x); }} className="text-purple-600">Edit</button>
                  <button onClick={() => remove(x)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <Empty text={list.length ? "No results match your filters" : `No ${title.toLowerCase()} yet. Click "Add" to create one.`} />}
      </div>
      <Pagination page={page} pages={pages} onChange={setPage} />

      {form && (
        <Modal title={`${form.id ? "Edit" : "Add"} ${title.slice(0, -1)}`} onClose={() => setForm(null)}>
          <div className="space-y-3">
            <Field label="Name" error={errors.name}><input className={inputCls} value={form.name} onChange={set("name")} /></Field>
            <Field label="Email" error={errors.email}><input className={inputCls} value={form.email} onChange={set("email")} /></Field>
            <Field label="Phone" error={errors.phone}><input className={inputCls} value={form.phone} onChange={set("phone")} /></Field>
            <Field label="Company"><input className={inputCls} value={form.company} onChange={set("company")} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Status"><select className={inputCls} value={form.status} onChange={set("status")}>{statuses.map((s) => <option key={s}>{s}</option>)}</select></Field>
              <Field label="Source"><select className={inputCls} value={form.source} onChange={set("source")}>{SOURCES.map((s) => <option key={s}>{s}</option>)}</select></Field>
            </div>
            <button className={btn + " w-full"} onClick={save}>Save</button>
          </div>
        </Modal>
      )}
      {toast}
    </div>
  );
}
