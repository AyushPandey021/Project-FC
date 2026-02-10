import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RedirectHome = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "finder") return <Navigate to="/finder/dashboard" replace />;
  if (user.role === "cleaner") return <Navigate to="/cleaner/dashboard" replace />;
  if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;

  return <Navigate to="/login" replace />;
};

export default RedirectHome;
