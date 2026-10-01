import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../Components/Header";

const links = [
  ["/dashboard", "📊 Overview"], ["/dashboard/leads", "🎯 Leads"],
  ["/dashboard/customers", "👥 Customers"], ["/dashboard/deals", "💼 Deals"],
  ["/dashboard/tasks", "✅ Tasks"], ["/dashboard/activities", "🕒 Activities"],
  ["/dashboard/profile", "👤 Profile"],
];

const Dashboard = () => {
  const [SideBar, setSideBar] = useState(true);
  return (
    <div className="w-screen h-screen flex flex-col bg-gray-100">
      <Header SideBar={SideBar} setSideBar={setSideBar} />
      <div className="flex flex-1 overflow-hidden">
        {SideBar && (
          <aside className="w-56 bg-gray-400 p-3 space-y-2 shrink-0 overflow-auto">
            <p className="text-center font-semibold mb-4">Admin Dashboard</p>
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/dashboard"}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-xl border-2 border-black text-white font-bold ${isActive ? "bg-purple-700" : "bg-purple-500 hover:bg-purple-600"}`}>
                {label}
              </NavLink>
            ))}
          </aside>
        )}
        <main className="flex-1 overflow-auto p-6"><Outlet /></main>
      </div>
    </div>
  );
};

export default Dashboard;
