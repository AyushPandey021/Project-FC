import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const FindCearners = () => {
  const { user } = useAuth();

  const [cleaners, setCleaners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  /* ================= DISTANCE FUNCTION ================= */
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat2 || !lon2) return null;

    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  /* ================= LOAD CLEANERS ================= */
  useEffect(() => {
    const fetchCleaners = () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await api.get("/profile/available-cleaners");

            const cleanersArray = Array.isArray(res.data)
              ? res.data
              : res.data.cleaners || [];

            if (!cleanersArray.length) {
              setErrorMsg("No available cleaners found in your area.");
              setLoading(false);
              return;
            }

            const cleanersWithDistance = cleanersArray
              .map((cleaner) => {
                const distance = calculateDistance(
                  latitude,
                  longitude,
                  cleaner.latitude,
                  cleaner.longitude
                );

                if (!distance) return null;

                return {
                  ...cleaner,
                  distance: Number(distance),
                };
              })
              .filter(Boolean)
              .sort((a, b) => a.distance - b.distance);

            if (!cleanersWithDistance.length) {
              setErrorMsg("No nearby cleaners found.");
            } else {
              setCleaners(cleanersWithDistance);
              localStorage.setItem(
                "nearbyCleaners",
                JSON.stringify(cleanersWithDistance)
              );
            }
          } catch (err) {
            console.error("Error fetching cleaners:", err);
            setErrorMsg("Failed to fetch cleaners. Please try again.");
          } finally {
            setLoading(false);
          }
        },
        () => {
          setErrorMsg("Location permission is required to find nearby cleaners.");
          setLoading(false);
        }
      );
    };

    // 🔥 Check cache first
    const cached = localStorage.getItem("nearbyCleaners");

    if (cached) {
      setCleaners(JSON.parse(cached));
      setLoading(false);
    } else {
      fetchCleaners();
    }
  }, []);

  /* ================= LOADING UI ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  /* ================= ERROR UI ================= */
  if (errorMsg) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-6">
        <div>
          <p className="text-lg text-red-600 font-medium">{errorMsg}</p>
        </div>
      </div>
    );
  }

  /* ================= MAIN UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Nearest Cleaners</h2>

        <div className="grid gap-4">
          {cleaners.map((cleaner) => (
            <div
              key={cleaner._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">
                  {cleaner.userId?.name || "Cleaner"}
                </h3>

                <span className="text-blue-600 font-medium">
                  {cleaner.distance} KM
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                📍 {cleaner.location}
              </p>

              <p className="text-sm mt-2 font-medium">
                ₹ {cleaner.pricePerDay} / day
              </p>

              <button
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => {
                  if (!user?.profileCompleted) {
                    alert("⚠ Please complete your profile to view details.");
                  } else {
                    alert("Show full cleaner details page here.");
                  }
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindCearners;
