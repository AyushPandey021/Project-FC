import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
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
    navigate("/login", { replace: true });
  };

  // 🔹 Initials for avatar
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-blue-600
                     hover:scale-105 transition-transform"
        >
          Find<span className="text-gray-900">Cleaner</span>
        </Link>

        {/* CENTER NAV LINKS */}
        <div className="hidden md:flex items-center gap-10">

          {/* FINDER */}
          {user.role === "finder" && (
            <>
              <NavItem to="/finder/dashboard" label="Dashboard" />
              <NavItem to="/finder/cleanerlist" label="Find Cleaners" />
              <NavItem to="/finder/profile" label="Profile" />
            </>
          )}

          {/* CLEANER */}
          {user.role === "cleaner" && (
            <>
              <NavItem to="/cleaner/dashboard" label="Dashboard" />
              <NavItem to="/cleaner/availablejobs" label="Jobs" />
              <NavItem to="/cleaner/earnings" label="Earnings" />
              <NavItem to="/cleaner/profile" label="Profile" />
            </>
          )}

          {/* ADMIN */}
          {user.role === "admin" && (
            <>
              <NavItem to="/admin/dashboard" label="Dashboard" />
              <NavItem to="/admin/verifycleaners" label="Verify Cleaners" />
              <NavItem to="/admin/jobs" label="Jobs" />
            </>
          )}
        </div>

        {/* RIGHT PROFILE + LOGOUT */}
        <div className="flex items-center gap-5">

          {/* USER INFO */}
          <div className="hidden sm:flex flex-col text-right leading-tight">
            <span className="text-sm font-semibold text-gray-800">
              {user.name}
            </span>
            <span className="text-xs text-gray-500 capitalize">
              {user.role}
            </span>
          </div>

          {/* AVATAR */}
          <Link
            to={
              user.role === "finder"
                ? "/finder/profile"
                : user.role === "cleaner"
                ? "/cleaner/profile"
                : "/admin/dashboard"
            }
            className="relative group"
          >
            <div
              className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600
                         text-white font-bold flex items-center justify-center
                         shadow-lg transform transition
                         group-hover:scale-110 group-hover:shadow-xl"
            >
              {initials}
            </div>
          </Link>

          {/* LOGOUT ICON */}
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 rounded-full bg-gray-100 hover:bg-red-100
                       text-gray-600 hover:text-red-600
                       shadow transition transform hover:scale-110"
          >
            ⎋
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative text-sm font-medium transition
       ${
         isActive
           ? "text-blue-600"
           : "text-gray-700 hover:text-blue-600"
       }`
    }
  >
    {({ isActive }) => (
      <>
        <span className="px-1">{label}</span>
        <span
          className={`absolute left-0 -bottom-1 h-[2px] w-full rounded
            transition-all duration-300
            ${isActive ? "bg-blue-600" : "bg-transparent group-hover:bg-blue-400"}`}
        />
      </>
    )}
  </NavLink>
);
