import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

const FinderDashboard = () => {

  const [location, setLocation] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {

    // Backend test
    api.get("/")
      .then(res => console.log(res.data))
      .catch(err => console.error(err));

    // Fetch Location
    if (!navigator.geolocation) {
      setLocation("Location not supported");
      setLoadingLocation(false);
      return;
    }

 navigator.geolocation.getCurrentPosition(
  async (position) => {
    try {
      const { latitude, longitude } = position.coords;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      const data = await res.json();

      // FULL EXACT ADDRESS
      setLocation(data.display_name);

    } catch (error) {
      setLocation("Unable to fetch location");
    } finally {
      setLoadingLocation(false);
    }
  },
  () => {
    setLocation("Location permission denied");
    setLoadingLocation(false);
  },
  {
    enableHighAccuracy: true,  // 🔥 more accurate
    timeout: 10000,
    maximumAge: 0
  }
);


  }, []);

  const cards = [
    {
      title: "Find Cleaners",
      desc: "Browse nearby verified cleaners",
      path: "/finder/CleanerList",
      color: "from-indigo-500 to-blue-600",
    },
    {
      title: "My Profile",
      desc: "Manage your location & work needs",
      path: "/finder/Profile",
      color: "from-emerald-500 to-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-200 p-6">

      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Finder Dashboard 👋
        </h2>
        <p className="text-gray-500 mt-1">
          Find trusted cleaners near your location
        </p>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">

        {/* Location Card */}
        <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Location</p>

          {loadingLocation ? (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-gray-400">Fetching location...</span>
            </div>
          ) : (
            <p className="text-lg font-semibold text-gray-800">
              {location}
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Available Cleaners</p>
          <p className="text-lg font-semibold text-gray-800">
            12+
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Last Activity</p>
          <p className="text-lg font-semibold text-gray-800">
            Today
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
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition"></div>

            <h3 className="text-xl font-semibold">
              {card.title}
            </h3>

            <p className="text-sm opacity-90 mt-1">
              {card.desc}
            </p>

            <span className="inline-block mt-4 text-sm font-medium opacity-90">
              Open →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FinderDashboard;
