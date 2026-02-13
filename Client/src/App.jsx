import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// auth
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import FinderProfile from "./pages/finder/FinderProfile";
import CleanerProfile from "./pages/cleaner/ClearnerProfile";
// dashboards
import FinderDashboard from "./pages/finder/FinderDashboard";
import CleanerDashboard from "./pages/cleaner/CleanerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RequestJob from "./pages/cleaner/ReqJob";
import AvailableJobs from "./pages/cleaner/AvailableJobs";
import Earnings from "./pages/cleaner/Earnings";

// profile
import CompleteProfile from "./pages/profile/CompleteProfile";

// navbar
import Navbar from "./Components/Navbar";
import RedirectHome from "./pages/RedirectHome";
import Myjob from "./pages/cleaner/Myjob";
import FindCearners from "./pages/finder/FindCearners";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* auth */}
        <Route path="/" element={<RedirectHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
<Route path="/cleaner/availablejobs" element={<AvailableJobs />} />
<Route path="/cleaner/earnings" element={<Earnings />} />
<Route path="/cleaner/myjobs" element={<Myjob />} />

        {/* dashboards */}
        <Route path="/finder/dashboard" element={<FinderDashboard />} />
        <Route path="/cleaner/dashboard" element={<CleanerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

<Route path="/cleaner/requestjob" element={<RequestJob />} />

        {/* profile */}
        <Route path="/finder/profile" element={<FinderProfile />} />
        <Route path="/cleaner/profile" element={<CleanerProfile />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/finder/cleanerlist" element={<FindCearners  />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
