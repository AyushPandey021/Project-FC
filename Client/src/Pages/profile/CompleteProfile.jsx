import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import { useAuth } from "../../hooks/useAuth";

const CompleteProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/profile/complete", form);

    // redirect after completion
    if (user.role === "finder") navigate("/finder/dashboard");
    if (user.role === "cleaner") navigate("/cleaner/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          Complete Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* CLEANER FORM */}
          {user.role === "cleaner" && (
            <>
              <input name="phone" placeholder="Phone" onChange={handleChange} className="input" />
              <input name="location" placeholder="Location" onChange={handleChange} className="input" />
              <input name="pricePerDay" placeholder="Price per day" onChange={handleChange} className="input" />
            </>
          )}

          {/* FINDER FORM */}
          {user.role === "finder" && (
            <>
              <input name="phone" placeholder="Phone" onChange={handleChange} className="input" />
              <input name="location" placeholder="Location" onChange={handleChange} className="input" />
              <select name="placeType" onChange={handleChange} className="input">
                <option value="">Select Place</option>
                <option value="home">Home</option>
                <option value="pg">PG</option>
                <option value="hotel">Hotel</option>
              </select>
            </>
          )}

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
