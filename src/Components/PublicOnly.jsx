import { Navigate } from "react-router-dom";

const PublicOnly = ({ children }) => {
  let login = JSON.parse(localStorage.getItem("isLogin"));
  if (login) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default PublicOnly;
