import { Navigate } from "react-router-dom";
import { AuthProvider  } from "../context/AuthContext";

const RedirectHome = () => {
  const { user } = AuthProvider ();

  if (!user) return <Navigate to="/login" />;

  if (!user.profileCompleted) {
    return <Navigate to="/complete-profile" />;
  }

  if (user.role === "finder") return <Navigate to="/finder/dashboard" />;
  if (user.role === "cleaner") return <Navigate to="/cleaner/dashboard" />;
  if (user.role === "admin") return <Navigate to="/admin/dashboard" />;

  return <Navigate to="/login" />;
};

export default RedirectHome;
