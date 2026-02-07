import { BrowserRouter, Routes, Route } from "react-router-dom";

// auth
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import FinderProfile from "./pages/finder/FinderProfile";
import CleanerProfile from "./pages/cleaner/ClearnerProfile";



// dashboards
import FinderDashboard from "./pages/finder/FinderDashboard";
import CleanerDashboard from "./pages/cleaner/CleanerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

// profile
import CompleteProfile from "./pages/profile/CompleteProfile";


// navbar
import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* auth */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* profile */}
        <Route path="/complete-profile" element={<CompleteProfile />} />
<Route path="/finder/profile" element={<FinderProfile />} />
<Route path="/cleaner/profile" element={<CleanerProfile />} />
        {/* dashboards */}
        <Route path="/finder/dashboard" element={<FinderDashboard />} />
        <Route path="/cleaner/dashboard" element={<CleanerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
