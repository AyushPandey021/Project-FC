import { useEffect } from "react";
import api from "../../Services/api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  useEffect(() => {
    // test backend connection
    api.get("/")
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  const cards = [
    {
      title: "Verify Cleaners",
      desc: "Approve or reject cleaner profiles",
      path: "/admin/VerifyCleaners",
      color: "from-violet-600 to-purple-700",
    },
    {
      title: "All Jobs",
      desc: "View and manage all platform jobs",
      path: "/admin/Jobs",
      color: "from-sky-600 to-blue-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200 p-6">

      {/* Header */}
      <div className="mb-10 animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-800">
          Admin Dashboard 🛡️
        </h2>
        <p className="text-gray-500 mt-1">
          Control, monitor, and manage the platform
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Pending Cleaners</p>
          <p className="text-xl font-semibold text-orange-600">
            5
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Active Jobs</p>
          <p className="text-xl font-semibold text-gray-800">
            18
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-xl font-semibold text-gray-800">
            124
          </p>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.path}
            className={`group relative overflow-hidden rounded-2xl p-6 text-white
                        bg-gradient-to-r ${card.color}
                        shadow-lg hover:shadow-2xl
                        transform hover:-translate-y-1
                        transition-all duration-300`}
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition"></div>

            <h3 className="text-xl font-semibold">
              {card.title}
            </h3>

            <p className="text-sm opacity-90 mt-1">
              {card.desc}
            </p>

            <span className="inline-block mt-4 text-sm font-medium opacity-90">
              Manage →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
