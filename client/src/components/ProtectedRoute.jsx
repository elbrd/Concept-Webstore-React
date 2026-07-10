import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const loggedInUser = !!sessionStorage.getItem("token");

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
