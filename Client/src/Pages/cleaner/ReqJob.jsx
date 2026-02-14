
import { useEffect, useState } from "react";
import api from "../../services/api";
import { getMyProfile } from "../../services/profile";

const RequestJob = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    workType: "",
    workTime: "",
    experience: "",
    paymentMode: "",
    amount: "",
    description: "",
    location: ""
  });

  const [error, setError] = useState("");
useEffect(() => {
  (async () => {
    const res = await getMyProfile();

    setForm((prev) => ({
      ...prev,
      name: res.data.user.name,
      phone: res.data.profile?.phone || "",
    }));
  })();
}, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/jobs/create", form);
      alert("✅ Job Request Created Successfully");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to create job");
    }
  };

const fetchLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      const data = await res.json();

      setForm((prev) => ({
        ...prev,
        location: data.display_name,  // readable address
        latitude,                     // 👈 SAVE THIS
        longitude                     // 👈 SAVE THIS
      }));
    },
    () => {
      alert("Unable to fetch location");
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6">
          Create Job Request
        </h2>

        {error && (
          <div className="mb-4 bg-red-100 text-red-600 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

   <input
  name="name"
  value={form.name}
  readOnly
  className="input bg-gray-100 cursor-not-allowed"
/>


          <input name="age" type="number"
            placeholder="Age" onChange={handleChange} className="input" />

          <input name="phone"
            placeholder="Phone Number"
            onChange={handleChange} className="input" required />
            <div className="flex gap-2">
  <input
    name="location"
    placeholder="Location"
    value={form.location}
    onChange={handleChange}
    className="input flex-1"
  />

  <button
    type="button"
    onClick={fetchLocation}
    className="bg-green-600 text-white px-4 rounded-lg"
  >
    Use My Location
  </button>
</div>


          <select name="workType"
            onChange={handleChange} className="input" required>
            <option value="">Select Work Type</option>
            <option value="Home">Home</option>
            <option value="PG">PG</option>
            <option value="Hotel">Hotel</option>
            <option value="Hospital">Hospital</option>
            <option value="Office">Office</option>
          </select>

    <select
  name="workTime"
  value={form.workTime}
  onChange={handleChange}
  className="input"
  required
>
  <option value="">Select Work Time</option>

  <optgroup label="Half Day">
    <option value="Half Day (9 AM - 12 PM)">
      Half Day (9 AM - 12 PM)
    </option>
    <option value="Half Day (1 PM - 5 PM)">
      Half Day (1 PM - 5 PM)
    </option>
  </optgroup>

  <optgroup label="Full Day">
    <option value="Full Day (9 AM - 5 PM)">
      Full Day (9 AM - 5 PM)
    </option>
    <option value="Full Day (8 AM - 6 PM)">
      Full Day (8 AM - 6 PM)
    </option>
  </optgroup>

  <optgroup label="Night Shift">
    <option value="Night (8 PM - 6 AM)">
      Night (8 PM - 6 AM)
    </option>
    <option value="Night (10 PM - 5 AM)">
      Night (10 PM - 5 AM)
    </option>
  </optgroup>

</select>

          <input name="experience"
            placeholder="Experience (Optional)"
            onChange={handleChange} className="input" />

          <select name="paymentMode"
            onChange={handleChange} className="input" required>
            <option value="">Payment Mode</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Online">Online</option>
          </select>

          <input name="amount"
            type="number"
            placeholder="Amount ₹"
            onChange={handleChange} className="input" required />

          <textarea
            name="description"
            placeholder="Additional Details"
            onChange={handleChange}
            className="input"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Submit Job Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestJob;
