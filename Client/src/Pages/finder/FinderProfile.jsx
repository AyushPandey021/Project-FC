import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile, completeProfile } from "../../services/profile";
import { useAuth } from "../../context/AuthContext";

const FinderProfile = () => {
  const { user, updateUser } = useAuth(); // ✅ use global auth
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getMyProfile().then((res) => {
      setProfile(res.data.profile || {});
    });
  }, []);

  if (!user) return null;

  // 🔢 Progress calculation
  const requiredFields = ["phone", "location", "placeType"];
  const filled = requiredFields.filter((f) => profile?.[f]).length;
  const progress = Math.round((filled / requiredFields.length) * 100);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await completeProfile(profile);

    // ✅ Update local profile state
    setProfile(res.data.profile);

    // ✅ Update global auth state
    updateUser({
      ...user,
      profileCompleted: true,
    });

    setShowForm(false);

    alert("✅ Profile completed successfully. You can now use all services.");

  } catch (err) {
    console.error("PROFILE SUBMIT ERROR:", err.response);

    alert(
      err.response?.data?.msg || "Something went wrong. Please try again."
    );
  }
};

// location fetch: 
const fetchLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  setLoadingLocation(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const data = await res.json();

        setProfile((prev) => ({
          ...prev,
          location: data.display_name,
        }));

      } catch (err) {
        alert("Failed to fetch address");
      } finally {
        setLoadingLocation(false);
      }
    },
    () => {
      alert("Location permission denied");
      setLoadingLocation(false);
    }
  );
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl bg-white rounded-xl p-6 shadow">

        {/* BASIC INFO */}
        <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-500 mb-4">
          Role: {user.role}
        </p>

        {/* PROGRESS BAR */}
        <div className="mb-4">
          <div className="flex justify-between text-sm">
            <span>Profile Progress</span>
            <span>{user.profileCompleted ? "100%" : `${progress}%`}</span>
          </div>

          <div className="h-2 bg-gray-200 rounded">
            <div
              className={`h-2 rounded transition-all duration-300 ${
                user.profileCompleted ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{
                width: user.profileCompleted ? "100%" : `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* STATUS / ACTION */}
        {user.profileCompleted ? (
          <p className="text-green-600 font-semibold">
            ✔ Profile completed successfully. You can use all services.
          </p>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Complete Your Profile
          </button>
        )}
      </div>

      {/* COMPLETE PROFILE FORM */}
      {showForm && (
        <div className="max-w-2xl bg-white rounded-xl p-6 shadow mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="phone"
              placeholder="Phone"
              value={profile.phone || ""}
              onChange={handleChange}
              className="input"
              required
            />

            <div className="space-y-2">
  <input
    name="location"
    placeholder="Location"
    value={profile.location || ""}
    onChange={handleChange}
    className="input"
    required
  />

  <button
    type="button"
    onClick={fetchLocation}
    className="flex items-center gap-2 text-blue-600 text-sm"
  >
    {loadingLocation ? (
      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    ) : (
      "📍 Use My Location"
    )}
  </button>
</div>


            <select
              name="placeType"
              value={profile.placeType || ""}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select Place</option>
              <option value="home">Home</option>
              <option value="pg">PG</option>
              <option value="hotel">Hotel</option>
              <option value="office">Office</option>
            </select>

            <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
              Save Profile
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FinderProfile;
