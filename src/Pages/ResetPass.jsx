import React, { useState } from "react";
import bgImage from "../assets/neon-aesthetic-city-night-view-bkkb6wfxvpanoc9j.jpg";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
  const [newPass, setNewPass] = useState("");
  const [confNewPass, setConfNewPass] = useState("");

  const navigate = useNavigate();
  localStorage.removeItem("resetFlag");

  const checker = () => {
    let userData = JSON.parse(localStorage.getItem("userInfo"));

    let upperChar = false;
    let specialChar = false;
    const specialChars = "!@#$%^&*()_+-=";

    for (let i = 0; i < newPass.length; i++) {
      const char = newPass.charAt(i);

      if (char >= "A" && char <= "Z") {
        upperChar = true;
      }

      if (specialChars.includes(char)) {
        specialChar = true;
      }
    }

    if (newPass === "" || confNewPass === "") {
      alert("Please Fill All the required fields!!");
    } else if (newPass.length < 8 || !upperChar || !specialChar) {
      alert(
        "Length of password must be 8 characters and contain atleast one Uppercase and one special character!!",
      );
    } else if (newPass === userData.pass) {
      alert("New Password Must be different from the Old one!!");
    } else if (newPass !== confNewPass) {
      alert("New Password and Confirmed New Password are not same!!");
    } else {
      alert("New Password created Successfully!! Redirecting to Login Page..");
      userData.pass = newPass;
      userData.confPass = confNewPass;
      localStorage.setItem("userInfo", JSON.stringify(userData));
      setNewPass("");
      setConfNewPass("");
      navigate("/signin");
    }
  };

  return (
    <>
      <div
        className="w-screen h-screen flex flex-col justify-center items-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-transparent w-100 h-fit backdrop-blur-[20px] flex justify-center items-center border border-gray-400 rounded-[20px]">
          <div className="flex flex-col  py-30 gap-6 justify-center items-center text-white">
            <p className="text-2xl text-purple-400">Reset Password</p>
            <input
              type="password"
              name="password"
              placeholder="New Password"
              required
              className="w-70 h-8 border border-gray-400 rounded-[10px]  px-3"
              onChange={(e) => setNewPass(e.target.value)}
            />
            <input
              type="password"
              name="confPassword"
              placeholder="Confirm New Password"
              required
              className="w-70 h-8 border border-gray-400 rounded-[10px]  px-3"
              onChange={(e) => setConfNewPass(e.target.value)}
            />
            <button
              className="w-[50%] h-10 bg-purple-500 rounded-[10px]"
              onClick={checker}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPass;
