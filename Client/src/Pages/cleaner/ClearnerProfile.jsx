import { useEffect, useState } from "react";
import { getMyProfile, completeProfile } from "../../services/profile";
import { useAuth } from "../../context/AuthContext";

const JOB_TYPES = ["Home", "PG", "Hotel", "Office"];

const CleanerProfile = () => {
  const { updateUser } = useAuth();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(false);


  /* ---------------- FETCH PROFILE ---------------- */
  useEffect(() => {
    (async () => {
      const res = await getMyProfile();
      setUser(res.data.user);
      setProfile(res.data.profile || {});
      setLoading(false);
    })();
  }, []);

  if (loading || !user) return null;

  /* ---------------- PROGRESS ---------------- */
const requiredFields = ["phone", "location", "pricePerDay", "latitude", "longitude"];

  const filled = requiredFields.filter((f) => profile?.[f]).length;
  const progress = Math.round((filled / requiredFields.length) * 100);

  /* ---------------- HANDLERS ---------------- */
const handleChange = (e) => {
  const { name, value } = e.target;

  setProfile({
    ...profile,
    [name]: name === "pricePerDay" ? Number(value) : value,
  });
};

  const toggleJobType = (type) => {
    setProfile((prev) => ({
      ...prev,
      jobTypes: prev.jobTypes?.includes(type)
        ? prev.jobTypes.filter((t) => t !== type)
        : [...(prev.jobTypes || []), type],
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  const requiredFields = ["phone", "location", "pricePerDay", "latitude", "longitude"];

  for (let field of requiredFields) {
    if (!profile[field]) {
      setError("Please fill all required fields including location");
      return;
    }
  }

  if (!profile.jobTypes?.length) {
    setError("Select at least one job type");
    return;
  }

  try {
    const res = await completeProfile(profile);

    setProfile(res.data.profile);

    const updatedUser = {
      ...user,
      profileCompleted: true,
    };

    updateUser(updatedUser);
    setUser(updatedUser);

    setOpen(false);
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.msg || "Profile update failed");
  }
};


const fetchLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  setLocating(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      const data = await res.json();

      setProfile(prev => ({
        ...prev,
        location: data.display_name,
        latitude,
        longitude
      }));

      setLocating(false);
    },
    () => {
      alert("Unable to fetch location");
      setLocating(false);
    }
  );
};





  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">

      {/* MAIN CARD */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-400">Role: Cleaner</p>

        {/* PROGRESS */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-1">
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
          <>
            <div className="mt-4 flex items-center gap-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                ✔ Profile Verified
              </span>
              <button
                onClick={() => setOpen(true)}
                className="text-blue-600 hover:underline"
              >
                Edit Profile
              </button>
            </div>

            {/* READ-ONLY INFO */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <p><b>Phone:</b> {profile.phone}</p>
              <p><b>Location:</b> {profile.location}</p>
              <p><b>Price / Day:</b> ₹{profile.pricePerDay}</p>
              <p><b>Job Types:</b> {profile.jobTypes?.join(", ")}</p>
            </div>
          </>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Complete Your Profile
          </button>
        )}
      </div>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* SLIDE PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-1/2 bg-white z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 h-full overflow-y-auto">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              {user.profileCompleted ? "Edit Profile" : "Complete Profile"}
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-black text-2xl"
            >
              ✕
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL - READ ONLY */}
<input
  value={user.email}
  disabled
  className="input bg-gray-100 cursor-not-allowed"
/>

{/* ROLE - READ ONLY */}
<input
  value="Cleaner"
  disabled
  className="input bg-gray-100 cursor-not-allowed"
/>

{/* NAME */}

<input
  name="name"
  placeholder="Full Name"
  value={profile.name ?? user.name ?? ""}
  onChange={handleChange}
  className="input"
/>


            <input
              name="phone"
              placeholder="Phone"
              value={profile.phone || ""}
              onChange={handleChange}
              className="input"
            />

           <div className="flex gap-2">
  <input
    name="location"
    placeholder="Location"
    value={profile.location || ""}
    readOnly
    className="input flex-1 bg-gray-100 cursor-not-allowed"
  />

<button type="button" onClick={fetchLocation}>
  {locating ? "Fetching..." : "Use My Location"}
</button>

</div>


            {/* JOB TYPES */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Job Types
              </label>
              <div className="flex flex-wrap gap-2">
                {JOB_TYPES.map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => toggleJobType(type)}
                    className={`px-4 py-2 rounded-full border transition
                      ${
                        profile.jobTypes?.includes(type)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white"
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <input
              name="pricePerDay"
              type="number"
              placeholder="Price per day"
              value={profile.pricePerDay || ""}
              onChange={handleChange}
              className="input"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg
                         hover:bg-green-700 transition"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CleanerProfile;
