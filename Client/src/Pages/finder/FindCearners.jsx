import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const FindCearners = () => {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  /* ================= DISTANCE FUNCTION ================= */
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (lat2 == null || lon2 == null) return null;

    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Number((R * c).toFixed(1));
  };

  /* ================= FETCH JOBS ================= */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await api.get("/profile/available-jobs");

          if (!Array.isArray(res.data) || res.data.length === 0) {
            setErrorMsg("No jobs available right now.");
            setLoading(false);
            return;
          }

          const jobsWithDistance = res.data
            .map((job) => ({
              ...job,
              distance: calculateDistance(
                latitude,
                longitude,
                job.latitude,
                job.longitude
              ),
            }))
            .sort((a, b) => a.distance - b.distance);

          setJobs(jobsWithDistance);
        } catch (err) {
          console.error(err);
          setErrorMsg("Failed to fetch jobs.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setErrorMsg("Location permission is required.");
        setLoading(false);
      }
    );
  }, []);
// WhatsApp Message 
const generateWhatsAppMessage = (job) => {
  return `
Hello ${job.name},

I am interested in your cleaning service.
Location: ${job.location}
Work Type: ${job.workType}
Work Time: ${job.workTime}
Budget: ₹${job.amount}
Distance: ${job.distance} KM

Please let me know your availability.

Thank you.
  `;
};

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading nearby jobs...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (errorMsg) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        {errorMsg}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Nearby Cleaning Jobs
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">
                  {job.workType} Cleaning
                </h3>
                <span className="text-blue-600 font-medium">
                  {job.distance} KM
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-2">
                📍 {job.location}
              </p>

              <p className="font-medium text-lg mb-3">
                ₹ {job.amount}
              </p>

              <button
                onClick={() => {
                  if (!user?.profileCompleted) {
                    alert("Please complete your profile first.");
                  } else {
                    setSelectedJob(job);
                  }
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 relative max-h-[90vh] overflow-y-auto">

            {/* Close Button */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-6 text-center">
              Job Details
            </h3>

            <div className="space-y-3 text-sm">
              <p><b>Name:</b> {selectedJob.name}</p>
              <p><b>Age:</b> {selectedJob.age}</p>
              <p><b>Phone:</b> {selectedJob.phone}</p>
              <p><b>Work Type:</b> {selectedJob.workType}</p>
              <p><b>Work Time:</b> {selectedJob.workTime}</p>
              <p><b>Experience:</b> {selectedJob.experience}</p>
              <p><b>Payment Mode:</b> {selectedJob.paymentMode}</p>
              <p><b>Amount:</b> ₹{selectedJob.amount}</p>
              <p><b>Location:</b> {selectedJob.location}</p>
              <p><b>Description:</b> {selectedJob.description}</p>
              <p><b>Distance:</b> {selectedJob.distance} KM</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 grid grid-cols-2 gap-4">
<a
  href={`https://wa.me/${selectedJob.phone?.replace(/\D/g, "")}?text=${encodeURIComponent(
    generateWhatsAppMessage(selectedJob)
  )}`}
  target="_blank"
  rel="noreferrer"
  className="bg-green-600 text-white py-3 rounded-lg text-center hover:bg-green-700 transition"
>
  💬 Message Cleaner
</a>


              <a
                href={`tel:${selectedJob.phone}`}
                className="bg-blue-600 text-white py-3 rounded-lg text-center hover:bg-blue-700 transition"
              >
                📞 Call Cleaner
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default FindCearners;
