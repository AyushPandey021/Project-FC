import { Link } from "react-router-dom";

const CleanerDashboard = () => {
  const cards = [
    {
      title: "Request Job",
      path: "/cleaner/RequestJob",
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Available Jobs",
      path: "/cleaner/AvailableJobs",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "My Jobs",
      path: "/cleaner/MyJobs",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Active Jobs",
      path: "/cleaner/ActiveJobs",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Earnings",
      path: "/cleaner/Earnings",
      color: "from-yellow-500 to-amber-500",
    },
    {
      title: "Notifications",
      path: "/cleaner/Notifications",
      color: "from-cyan-500 to-sky-500",
    },
    {
      title: "Profile",
      path: "/cleaner/Profile",
      color: "from-gray-600 to-gray-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-6">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-800">
          Cleaner Dashboard 👋
        </h2>
        <p className="text-gray-500 mt-1">
          Manage your jobs, earnings, and profile
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-xl font-semibold text-green-600">Available</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Today Jobs</p>
          <p className="text-xl font-semibold text-gray-800">2</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Today Earnings</p>
          <p className="text-xl font-semibold text-gray-800">₹1,200</p>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.path}
            className={`group relative overflow-hidden rounded-2xl p-6 text-white shadow-lg 
                       bg-gradient-to-r ${card.color}
                       transform hover:-translate-y-1 hover:shadow-2xl
                       transition-all duration-300`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-black transition"></div>
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p className="text-sm opacity-90 mt-1">
              Open {card.title.toLowerCase()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CleanerDashboard;
