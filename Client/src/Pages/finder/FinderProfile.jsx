import { useState } from "react";

const FinderProfile = () => {
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "",
    location: "",
    placeType: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated profile:", form);
    alert("Profile updated successfully ✅");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-200 p-6">
      
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-800">
          My Profile
        </h2>
        <p className="text-gray-500 mt-1">
          Manage your personal details
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-2xl bg-white rounded-2xl shadow-xl p-8">

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              value={form.email}
              disabled
              className="w-full px-4 py-3 border rounded-xl bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              placeholder="Enter phone number"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Location
            </label>
            <input
              name="location"
              placeholder="City / Area"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Place Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Place Type
            </label>
            <select
              name="placeType"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select place type</option>
              <option value="home">Home</option>
              <option value="pg">PG</option>
              <option value="hotel">Hotel</option>
              <option value="office">Office</option>
            </select>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl
                       hover:bg-blue-700 active:scale-[0.98] transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default FinderProfile;
