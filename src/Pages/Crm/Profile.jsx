import { useState } from "react";
import { getAdmin, saveAdmin } from "../../utils/auth";
import { Field, inputCls, btn, useToast } from "../../Components/ui";

// same password rule as your Signup page
const strong = (p) => p.length >= 8 && /[A-Z]/.test(p) && /[!@#$%^&*()_+\-=]/.test(p);

export default function Profile() {
  const [admin, setAdmin] = useState(getAdmin());
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [f, setF] = useState({});
  const [error, setError] = useState("");
  const [toast, notify] = useToast();

  const start = () => { setF({ name: admin.name, email: admin.email, gender: admin.gender, current: "", newPass: "" }); setError(""); setEdit(true); };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const save = () => {
    if (!f.name.trim()) return setError("Name is required");
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setError("Enter a valid email");
    if (f.current !== admin.pass) return setError("Current password is incorrect");
    if (f.newPass && !strong(f.newPass)) return setError("New password needs 8+ characters, one uppercase and one special character");
    const pass = f.newPass || admin.pass;
    const updated = { ...admin, name: f.name.trim(), email: f.email, gender: f.gender, pass, confPass: pass };
    saveAdmin(updated);
    setAdmin(updated);
    setEdit(false);
    notify("Profile updated");
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full bg-purple-500 text-white text-2xl font-bold flex items-center justify-center">
            {(admin.name || "A").charAt(0).toUpperCase()}
          </div>
          <div><p className="text-lg font-semibold">{admin.name}</p><p className="text-sm text-gray-500">Administrator</p></div>
        </div>

        {!edit ? (
          <>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2"><dt className="text-gray-500">Name</dt><dd>{admin.name}</dd></div>
              <div className="flex justify-between border-b pb-2"><dt className="text-gray-500">Email</dt><dd>{admin.email}</dd></div>
              <div className="flex justify-between border-b pb-2"><dt className="text-gray-500">Gender</dt><dd className="capitalize">{admin.gender || "-"}</dd></div>
              <div className="flex justify-between border-b pb-2">
                <dt className="text-gray-500">Password</dt>
                <dd>{show ? admin.pass : "•".repeat(admin.pass?.length || 8)} <button className="text-purple-600 ml-2" onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button></dd>
              </div>
            </dl>
            <button className={btn + " mt-5"} onClick={start}>Edit Profile</button>
          </>
        ) : (
          <div className="space-y-3">
            <Field label="Name"><input className={inputCls} value={f.name} onChange={set("name")} /></Field>
            <Field label="Email"><input className={inputCls} value={f.email} onChange={set("email")} /></Field>
            <Field label="Gender">
              <select className={inputCls} value={f.gender} onChange={set("gender")}><option value="male">Male</option><option value="female">Female</option></select>
            </Field>
            <Field label="New password (leave empty to keep current)"><input type="password" className={inputCls} value={f.newPass} onChange={set("newPass")} /></Field>
            <Field label="Current password (required to save)"><input type="password" className={inputCls} value={f.current} onChange={set("current")} /></Field>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-3">
              <button className={btn} onClick={save}>Save</button>
              <button className="px-4 py-2 border rounded-lg" onClick={() => setEdit(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
      {toast}
    </div>
  );
}
