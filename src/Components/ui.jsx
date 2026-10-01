import { useState } from "react";

export function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-5 shadow-xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">{title}</h2>
          <button onClick={onClose} className="text-2xl leading-none text-gray-500">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const colors = {
  New: "bg-blue-100 text-blue-700", Contacted: "bg-yellow-100 text-yellow-700",
  Qualified: "bg-green-100 text-green-700", Converted: "bg-purple-100 text-purple-700",
  Lost: "bg-red-100 text-red-700", Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-200 text-gray-600", High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700", Low: "bg-gray-200 text-gray-600",
};
export const Badge = ({ text }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colors[text] || "bg-gray-100"}`}>{text}</span>
);

export function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  return (
    <div className="flex items-center gap-2 justify-end mt-3 text-sm">
      <button disabled={page === 1} onClick={() => onChange(page - 1)} className="px-3 py-1 border rounded disabled:opacity-40">Prev</button>
      <span>Page {page} of {pages}</span>
      <button disabled={page === pages} onClick={() => onChange(page + 1)} className="px-3 py-1 border rounded disabled:opacity-40">Next</button>
    </div>
  );
}

export const Field = ({ label, error, children }) => (
  <label className="block text-sm">
    <span className="text-gray-600">{label}</span>
    {children}
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </label>
);
export const inputCls = "border border-gray-300 rounded-lg px-3 py-2 w-full mt-1 bg-white";
export const btn = "bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold";

export const Empty = ({ text }) => <p className="p-10 text-center text-gray-400">{text}</p>;

export function Bars({ data, fmt = (n) => n }) {
  const max = Math.max(...data.map((d) => d.v), 1);
  return data.map((d) => (
    <div key={d.k} className="flex items-center gap-3 text-sm mb-2">
      <span className="w-28 text-gray-600">{d.k}</span>
      <div className="flex-1 bg-gray-100 rounded h-4">
        <div className="bg-purple-500 h-4 rounded" style={{ width: (d.v / max) * 100 + "%" }} />
      </div>
      <span className="w-24 text-right">{fmt(d.v)}</span>
    </div>
  ));
}

// small toast hook: const [toast, notify] = useToast()
export function useToast() {
  const [msg, setMsg] = useState("");
  const notify = (m) => { setMsg(m); setTimeout(() => setMsg(""), 2000); };
  const toast = msg && <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50">{msg}</div>;
  return [toast, notify];
}
