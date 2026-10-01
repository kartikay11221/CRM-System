import React from "react";
import img from "../assets/shutterstock_479042983.jpg.webp";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <button
        className="p-3 w-fit h-fit bg-red-500 border-2 border-red-300 text-white rounded-[20px] font-bold relative top-100 left-107.5 
            transition-all duration-300 ease-in hover:bg-red-600"
        onClick={() => navigate("/")}
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default PageNotFound;
