import React from "react";
import bgVideo from "../assets/ekuv0t.mp4";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className=" w-screen h-screen overflow-hidden text-white flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 min-w-full min-h-full object-cover -z-20"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="fixed top-0 left-0 w-full h-full bg-black/50 -z-10" />

      <div className="flex flex-col gap-10 justify-center items-center">
        <h1 className="text-[80px]">Welcome To Home Page</h1>
        <div className="flex gap-3">
          <button
            className="w-50 h-10 bg-transparent border-2 border-gray-400 backdrop-blur-xl rounded-[10px] transition-all duration-100 ease-in hover:scale-105"
            onClick={() => navigate("/signin")}
          >
            Login
          </button>
          <button
            className="w-50 h-10 bg-transparent border-2 border-gray-400 backdrop-blur-xl rounded-[10px] transition-all duration-100 ease-in hover:scale-105"
            onClick={() => navigate("/signup")}
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
