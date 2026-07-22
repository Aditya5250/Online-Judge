import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  return getToken()
    ? children
    : <Navigate to="/login" replace />;
};

export default ProtectedRoute;