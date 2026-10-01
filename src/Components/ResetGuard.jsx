import React from "react";
import { Navigate } from "react-router-dom";

const ResetGuard = ({ children }) => {
  let resetFlag = localStorage.getItem("resetFlag");

  if (resetFlag !== "verified") {
    return <Navigate to="/forgotpass" replace />;
  }

  return children;
};

export default ResetGuard;
