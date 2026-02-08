import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  if (!user) return null;

  const hiddenPaths = ["/login", "/signup", "/complete-profile"];
  if (hiddenPaths.includes(location.pathname)) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">

      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        FindCleaner
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">

        {/* FINDER */}
        {user.role === "finder" && (
          <>
            <Link to="/finder/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/finder/cleanerlist" className="nav-link">Find Cleaners</Link>
            <Link to="/finder/profile" className="nav-link">Profile</Link>
          </>
        )}

        {/* CLEANER */}
        {user.role === "cleaner" && (
          <>
            <Link to="/cleaner/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/cleaner/availablejobs" className="nav-link">Jobs</Link>
            <Link to="/cleaner/earnings" className="nav-link">Earnings</Link>
            <Link to="/cleaner/profile" className="nav-link">Profile</Link>
          </>
        )}

        {/* ADMIN */}
        {user.role === "admin" && (
          <>
            <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/admin/verifycleaners" className="nav-link">Verify Cleaners</Link>
            <Link to="/admin/jobs" className="nav-link">Jobs</Link>
          </>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-red-500 font-medium hover:text-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
