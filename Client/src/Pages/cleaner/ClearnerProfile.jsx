import { useState } from "react";

const CleanerProfile = () => {
  const [form, setForm] = useState({
    name: "Ramesh Kumar",
    email: "ramesh@example.com",
    phone: "",
    location: "",
    jobTypes: [],
    pricePerDay: "",
    availability: true,
  });

  const jobOptions = ["Home", "PG", "Hotel", "Office"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleJobTypeChange = (type) => {
    setForm((prev) => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter((t) => t !== type)
        : [...prev.jobTypes, type],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cleaner Profile Updated:", form);
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
          Manage your work details and availability
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

          {/* Job Types */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Job Types
            </label>
            <div className="flex flex-wrap gap-3">
              {jobOptions.map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => handleJobTypeChange(type)}
                  className={`px-4 py-2 rounded-full border transition
                    ${
                      form.jobTypes.includes(type)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Price Per Day (₹)
            </label>
            <input
              name="pricePerDay"
              type="number"
              placeholder="e.g. 800"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Availability */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
            <span className="text-sm font-medium text-gray-700">
              Availability Status
            </span>
            <button
              type="button"
              onClick={() =>
                setForm({ ...form, availability: !form.availability })
              }
              className={`px-5 py-2 rounded-full font-semibold transition
                ${
                  form.availability
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
            >
              {form.availability ? "Available" : "Offline"}
            </button>
          </div>

          {/* Save */}
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

export default CleanerProfile;
