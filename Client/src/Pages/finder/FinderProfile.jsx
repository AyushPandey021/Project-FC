import { useEffect, useState } from "react";
import { getMyProfile, completeProfile } from "../../services/profile";

const FinderProfile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getMyProfile().then((res) => {
      setUser(res.data.user);
      setProfile(res.data.profile || {});
    });
  }, []);

  if (!user) return null;

  const requiredFields = ["phone", "location", "placeType"];
  const filled = requiredFields.filter((f) => profile?.[f]).length;
  const progress = Math.round((filled / requiredFields.length) * 100);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await completeProfile(profile);
    setShowForm(false);
    alert("✅ Profile completed successfully");
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

        {/* PROGRESS */}
        <div className="mb-4">
          <div className="flex justify-between text-sm">
            <span>Profile Progress</span>
            <span>{user.profileCompleted ? "100%" : `${progress}%`}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded">
            <div
              className={`h-2 rounded transition-all ${
                user.profileCompleted ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{ width: user.profileCompleted ? "100%" : `${progress}%` }}
            />
          </div>
        </div>

        {/* STATUS */}
        {user.profileCompleted ? (
          <p className="text-green-600 font-semibold">
            ✔ Profile Completed
          </p>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Complete Your Profile
          </button>
        )}
      </div>

      {/* FORM */}
      {showForm && (
        <div className="max-w-2xl bg-white rounded-xl p-6 shadow mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="phone"
              placeholder="Phone"
              value={profile.phone || ""}
              onChange={handleChange}
              className="input"
            />

            <input
              name="location"
              placeholder="Location"
              value={profile.location || ""}
              onChange={handleChange}
              className="input"
            />

            <select
              name="placeType"
              value={profile.placeType || ""}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Place</option>
              <option value="home">Home</option>
              <option value="pg">PG</option>
              <option value="hotel">Hotel</option>
            </select>

            <button className="w-full bg-green-600 text-white py-3 rounded">
              Save Profile
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FinderProfile;
