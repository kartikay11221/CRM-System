import { useNavigate } from "react-router-dom";
import { getAdmin } from "../utils/auth";

const Header = ({ SideBar, setSideBar }) => {
  const navigate = useNavigate();
  const admin = getAdmin();

  const logoutHandler = () => {
    localStorage.setItem("isLogin", JSON.stringify(false));
    alert("Successfully Logged Out!!");
    navigate("/signin");
  };

  return (
    <div className="h-14 bg-gray-700 text-white flex justify-between items-center px-4 shrink-0">
      <button className="text-xl" onClick={() => setSideBar(!SideBar)}>{SideBar ? "⬅️" : "➡️"}</button>
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/dashboard/profile")} className="flex items-center gap-2 hover:text-purple-300">
          <span className="w-8 h-8 rounded-full bg-white text-gray-800 flex items-center justify-center font-bold">
            {(admin.name || "A").charAt(0).toUpperCase()}
          </span>
          <span className="hidden sm:block">{admin.name || "Admin"}</span>
        </button>
        <button className="h-9 px-4 border-2 border-black bg-purple-500 rounded-2xl text-white font-bold" onClick={logoutHandler}>
          Logout👋🏻
        </button>
      </div>
    </div>
  );
};

export default Header;
