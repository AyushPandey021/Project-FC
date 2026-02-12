import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProfile, updateAvailability } from "../../services/profile";

const CleanerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await getMyProfile();
      setProfile(res.data.profile);
      setLoading(false);
    })();
  }, []);

  if (loading || !profile) return null;

  const toggleStatus = async () => {
    const res = await updateAvailability(!profile.availability);
    setProfile({ ...profile, availability: res.data.availability });
  };

  const cards = [
    {
      title: "Request Job",
      path: "/cleaner/requestjob",
      disabled: !profile.availability,
      color: "from-blue-500 to-indigo-500",
    },
    // {
    //   title: "Available Jobs",
    //   // path: "/cleaner/availablejobs",
    //   color: "from-green-500 to-emerald-500",
    // },
    {
      title: "My Jobs",
      path: "/cleaner/myjobs",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Profile",
      path: "/cleaner/profile",
      color: "from-gray-600 to-gray-800",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6">Cleaner Dashboard</h2>

      {/* STATUS CARD */}
      <div className="bg-white rounded-xl p-5 shadow flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-gray-500">Current Status</p>
          <p
            className={`text-xl font-semibold ${
              profile.availability ? "text-green-600" : "text-red-500"
            }`}
          >
            {profile.availability ? "Available" : "Not Available"}
          </p>
        </div>

        <button
          onClick={toggleStatus}
          className={`px-6 py-2 rounded-full text-white font-medium transition ${
            profile.availability
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {profile.availability ? "Go Offline" : "Go Online"}
        </button>
      </div>

      {/* NAVIGATION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) =>
          card.disabled ? (
            <div
              key={i}
              className="rounded-2xl p-6 bg-gray-300 text-gray-500 cursor-not-allowed"
            >
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="text-sm mt-1">Unavailable while offline</p>
            </div>
          ) : (
            <Link
              key={i}
              to={card.path}
              className={`rounded-2xl p-6 text-white shadow-lg
                bg-gradient-to-r ${card.color}
                hover:-translate-y-1 transition`}
            >
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="text-sm opacity-90 mt-1">Open</p>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default CleanerDashboard;
