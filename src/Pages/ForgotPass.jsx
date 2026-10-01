import React, { useEffect, useState } from "react";
import bgimg from "../assets/neon-aesthetic-city-night-view-bkkb6wfxvpanoc9j.jpg";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const [otp, setOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [countdown, setCountDown] = useState();
  const [resetOtp, setResetOtp] = useState(false);
  const [recOtp, setRecOtp] = useState(["", "", "", ""]);

  const navigate = useNavigate();

  const sendOtp = () => {
    let getEmail = JSON.parse(localStorage.getItem("userInfo"));
    getEmail = getEmail.email;
    if (email === "") {
      alert("Please Enter Your Email Address!!");
    } else if (email !== getEmail) {
      alert("Invalid Email Address..");
    } else {
      alert("OTP sent on the Email Address Successfully!!");
      setOtp(true);
      setCountDown(60);
      let OTP = Math.floor(1000 + Math.random() * 9000).toString();
      sessionStorage.setItem("otp", OTP);
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountDown(countdown - 1), 1000);
    }
    if (countdown === 0) {
      setResetOtp(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...recOtp];
    newOtp[index] = value;
    setRecOtp(newOtp);
  };

  const check = () => {
    let otp = sessionStorage.getItem("otp");
    let otp2 = recOtp.join("");
    if (recOtp.includes("")) {
      alert("Please Enter the OTP!!");
    } else if (otp !== otp2) {
      alert("Incorrect Otp!!");
    } else {
      alert("Correct Otp.. redirecting..");
      localStorage.setItem("resetFlag", "verified");
      navigate("/resetpass");
      sessionStorage.removeItem("otp");
    }
  };

  const sessionSetOtp = () => {
    sessionStorage.removeItem("otp");
    alert("Otp resent Successfully check Your Email..");
    setResetOtp(false);
    setCountDown(60);
    let OTP = Math.floor(1000 + Math.random() * 9000).toString();
    sessionStorage.setItem("otp", OTP);
  };

  return (
    <>
      <div
        className="w-screen h-screen flex flex-col justify-center items-center bg-no-repeat bg-cover "
        style={{ backgroundImage: `url(${bgimg})` }}
      >
        <div className="w-20 h-20 rounded-[50%] border border-gray-300 bg-transparent backdrop-blur-2xl text-2xl flex justify-center items-center z-20 relative top-8">
          🔑
        </div>
        <div className="w-100 h-fit py-20 bg-transparent backdrop-blur-2xl border border-gray-300 rounded-2xl flex flex-col justify-center items-center gap-10 text-white">
          <div className="flex flex-col gap-5 items-center">
            {otp ? (
              <>
                <p className="text-2xl text-purple-400">Enter the OTP</p>
                <div className="flex gap-4">
                  {recOtp.map((digit, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength="1"
                      value={digit}
                      className="w-12 h-fit p-4 bg-transparent border border-gray-400 rounded-2xl text-center"
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    className="w-fit px-2 h-10 bg-purple-500 rounded-[10px] text-white"
                    onClick={check}
                  >
                    Submit OTP
                  </button>
                  {resetOtp ? (
                    <button
                      className="w-fit px-2 h-10 bg-purple-500 rounded-[10px] text-white"
                      onClick={sessionSetOtp}
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <button className="w-fit px-2 h-10 bg-purple-500 rounded-[10px] text-white text-[12px]">
                      Resend OTP in: {countdown}s
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <p className="text-2xl text-purple-400">
                  Forgot Your Password?
                </p>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-70 h-8 border border-gray-400 rounded-[10px] px-3"
                />
                <button
                  className="w-[40%] h-10 bg-purple-500 rounded-[10px] text-white"
                  onClick={sendOtp}
                >
                  Send OTP
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
