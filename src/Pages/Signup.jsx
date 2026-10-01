import React, { useState } from "react";
import bgImage from "../assets/page_bg_raw.jpg";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    pass: "",
    confPass: "",
  });

  const navigate = useNavigate();

  const datasetter = (e) => {
    e.preventDefault();

    let upperChar = false;
    let specialChar = false;
    const specialChars = "!@#$%^&*()_+-=";

    for (let i = 0; i < user.pass.length; i++) {
      const char = user.pass.charAt(i);

      if (char >= "A" && char <= "Z") {
        upperChar = true;
      }

      if (specialChars.includes(char)) {
        specialChar = true;
      }
    }

    if (user.pass === "" || user.confPass === "") {
      alert("Please Fill All the details!!");
    } else if (user.pass.length < 8 || !upperChar || !specialChar) {
      alert(
        "Length of password must be 8 characters and contain atleast one Uppercase and one special character!!",
      );
    } else if (user.pass !== user.confPass) {
      alert("Given Password and Confirmed Password are not same!!");
    } else {
      localStorage.setItem("userInfo", JSON.stringify(user));
      alert("SignUp Successfull!! Redirecting to Login Page..");
      navigate("/signin");
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
              type="text"
              name="fullName"
              placeholder="Name"
              className="w-70 h-8 border border-gray-400 rounded-[10px] px-3"
              required
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />

            <div className="flex gap-3 self-start text-gray-400">
              <label htmlFor="male">Gender:</label>
              <div>
                <input
                  type="radio"
                  name="Gender"
                  value="male"
                  id="male"
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                />
                <label htmlFor="male">Male</label>
              </div>

              <div>
                <input
                  type="radio"
                  name="Gender"
                  value="female"
                  id="female"
                  required
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-70 h-8 border border-gray-400 rounded-[10px] px-3"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-70 h-8 border border-gray-400 rounded-[10px]  px-3"
              onChange={(e) => setUser({ ...user, pass: e.target.value })}
            />
            <input
              type="password"
              name="confPassword"
              placeholder="Confirm Password"
              required
              className="w-70 h-8 border border-gray-400 rounded-[10px]  px-3"
              onChange={(e) => setUser({ ...user, confPass: e.target.value })}
            />

            <button
              className="w-[50%] h-10 bg-purple-500 rounded-[10px]"
              onClick={datasetter}
            >
              SignUp
            </button>

            <p
              className=" text-[15px] mt-3 hover:text-purple-300 transition-all duration-300 ease-out cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              Already Registered? Click here to Login{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
