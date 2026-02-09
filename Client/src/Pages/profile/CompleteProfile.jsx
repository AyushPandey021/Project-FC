import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const CompleteProfile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/profile/complete", form);
      console.log("✅ Profile saved:", res.data);

      // ✅ update global auth + localStorage
      updateUser({
        ...user,
        profileCompleted: true,
      });

      // redirect to role dashboard
      if (user.role === "finder") navigate("/finder/dashboard");
      if (user.role === "cleaner") navigate("/cleaner/dashboard");
    } catch (err) {
      console.error("❌ Profile submit error:", err.response?.data || err);
      setError(err.response?.data?.msg || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow">

        <h2 className="text-2xl font-bold mb-2">Complete Your Profile</h2>
        <p className="text-sm text-gray-500 mb-6">
          This is required to use all services
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* CLEANER FORM */}
          {user.role === "cleaner" && (
            <>
              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                className="input"
                required
              />
              <input
                name="location"
                placeholder="Location"
                onChange={handleChange}
                className="input"
                required
              />
              <input
                name="pricePerDay"
                placeholder="Price per day"
                onChange={handleChange}
                className="input"
                required
              />
            </>
          )}

          {/* FINDER FORM */}
          {user.role === "finder" && (
            <>
              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                className="input"
                required
              />
              <input
                name="location"
                placeholder="Location"
                onChange={handleChange}
                className="input"
                required
              />
              <select
                name="placeType"
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
            </>
          )}

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg
                       hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
