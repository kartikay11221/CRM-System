import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  let login = localStorage.getItem("isLogin");
  login = JSON.parse(login);
  if (!login) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default Protected;
