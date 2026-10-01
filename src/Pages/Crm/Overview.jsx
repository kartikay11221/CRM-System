import { useSelector } from "react-redux";
import { Bars } from "../../Components/ui";
import { STAGES } from "../../store/store";
import { money, getAdmin } from "../../utils/auth";

export default function Overview() {
  const { leads, customers, deals, tasks, activities } = useSelector((s) => s);
  const admin = getAdmin();
  const won = deals.filter((d) => d.stage === "Won").reduce((a, d) => a + Number(d.value), 0);
  const conv = leads.length ? Math.round((leads.filter((l) => l.status === "Converted").length / leads.length) * 100) : 0;
  const kpis = [
    ["Total Leads", leads.length], ["Customers", customers.length],
    ["Open Deals", deals.filter((d) => !["Won", "Lost"].includes(d.stage)).length],
    ["Revenue (Won)", money(won)], ["Pending Tasks", tasks.filter((t) => !t.done).length],
    ["Lead Conversion", conv + "%"],
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Welcome, {admin.name || "Admin"} 😊</h2>
      <p className="text-gray-500 mb-5">Here is your CRM at a glance.</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map(([k, v]) => (
          <div key={k} className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">{k}</p>
            <p className="text-2xl font-bold">{v}</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mt-5">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-3">Pipeline value by stage</h3>
          {deals.length === 0 ? <p className="text-gray-400 text-sm">No deals yet</p> :
            <Bars fmt={money} data={STAGES.map((k) => ({ k, v: deals.filter((d) => d.stage === k).reduce((a, d) => a + Number(d.value), 0) }))} />}
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-3">Leads by status</h3>
          {leads.length === 0 ? <p className="text-gray-400 text-sm">No leads yet</p> :
            <Bars data={["New", "Contacted", "Qualified", "Converted", "Lost"].map((k) => ({ k, v: leads.filter((l) => l.status === k).length }))} />}
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm mt-4">
        <h3 className="font-semibold mb-2">Recent activity</h3>
        {activities.length === 0 ? <p className="text-gray-400 text-sm">Nothing yet. Add a lead to get started.</p> :
          activities.slice(0, 5).map((a) => (
            <p key={a.id} className="text-sm py-1 border-b last:border-0">{a.text} <span className="text-gray-400">· {new Date(a.at).toLocaleString()}</span></p>
          ))}
      </div>
    </div>
  );
}
