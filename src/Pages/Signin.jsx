import React, { useState } from "react";
import { Link, Navigate, replace, useNavigate } from "react-router-dom";
import bgImage from "../assets/page_bg_raw.jpg";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  let [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    let data = localStorage.getItem("userInfo");
    if (data) {
      data = JSON.parse(data);
      if (email === "" || pass === "") {
        alert("Please Enter the email and Paswword to login!!");
      } else if (email === data.email && pass === data.pass) {
        setIsLogin((isLogin = true));
        let sendLogin = isLogin;
        localStorage.setItem("isLogin", JSON.stringify(sendLogin));
        alert("Successfully Logged in redirecting to DashBoard..");
        navigate("/dashboard");
      } else {
        alert("Wrong Credentials, Enter valid one!!");
      }
    }
  };
  return (
    <>
      <div
        className="w-screen h-screen flex justify-center items-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-transparent w-100 h-fit backdrop-blur-[10px] flex justify-center items-center border border-gray-400 rounded-[20px]">
          <form className="flex flex-col py-25 gap-4 justify-center items-center text-white">
            <div className="w-20 h-20 rounded-[50%] bg-gray-300 border border-gray-400 mb-5 flex justify-center items-center text-3xl">
              👤
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-70 h-8 border border-gray-400 rounded-[10px] px-3"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="flex flex-col gap-2">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-70 h-8 border border-gray-400 rounded-[10px]  px-3"
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <div className="flex">
                <p
                  className="text-[15px] hover:cursor-pointer hover:text-purple-300"
                  onClick={() => navigate("/forgotpass")}
                >
                  Forgot Password?
                </p>
              </div>
            </div>
            <button
              className="w-[50%] h-10 bg-purple-500 rounded-[10px]"
              onClick={login}
            >
              Login
            </button>
            <p
              className=" text-[15px] mt-3 hover:text-purple-300 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Dont Have An Account? click here to Signup{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
