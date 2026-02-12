import { useEffect, useState } from "react";
import { getMyJobs, updateJob } from "../../services/job";

const Myjob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    (async () => {
      const res = await getMyJobs();
      setJobs(res.data);
      setLoading(false);
    })();
  }, []);

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

const handleUpdate = async () => {
  try {
    const res = await updateJob(selectedJob._id, editData);

    setJobs(jobs.map(job =>
      job._id === selectedJob._id ? res.data : job
    ));

    setSelectedJob(res.data);
    setEditMode(false);

  } catch (err) {
    console.error("FULL ERROR:", err.response);
    alert(err.response?.data?.msg || "Update failed");
  }
};


  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">My Jobs</h2>

        <div className="grid gap-4">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-5 rounded-xl shadow">
              <div className="flex justify-between">
                <h3 className="font-semibold text-lg">
                  {job.workType} Cleaning
                </h3>
                <span>₹{job.amount}</span>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                📍 {job.location}
              </p>

              <p className="text-sm mt-2">
                Status:{" "}
                <span className="font-medium text-yellow-600">
                  {job.availability}
                </span>
              </p>

              <div className="mt-3 flex gap-3">
                <button
                  onClick={() =>
                    setSelectedJob(
                      selectedJob?._id === job._id ? null : job
                    )
                  }
                  className="text-blue-600 underline"
                >
                  View
                </button>

                {job.availability === "pending" && (
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setEditData(job);
                      setEditMode(true);
                    }}
                    className="text-green-600 underline"
                  >
                    Edit
                  </button>
                )}
              </div>

              {/* VIEW PANEL */}
              {selectedJob?._id === job._id && (
                <div className="mt-4 border-t pt-4 space-y-2 text-sm animate-fade">
                  {editMode ? (
              <>
  <input
    name="name"
    value={editData.name || ""}
    onChange={handleEditChange}
    className="input"
    placeholder="Name"
  />

  <input
    name="phone"
    value={editData.phone || ""}
    onChange={handleEditChange}
    className="input"
    placeholder="Phone"
  />

  <input
    name="location"
    value={editData.location || ""}
    onChange={handleEditChange}
    className="input"
    placeholder="Location"
  />

  <input
    name="age"
    type="number"
    value={editData.age || ""}
    onChange={handleEditChange}
    className="input"
    placeholder="Age"
  />

  <select
    name="workType"
    value={editData.workType || ""}
    onChange={handleEditChange}
    className="input"
  >
    <option value="">Select Work Type</option>
    <option value="Home">Home</option>
    <option value="PG">PG</option>
    <option value="Hotel">Hotel</option>
    <option value="Office">Office</option>
  </select>

  <input
    name="workTime"
    value={editData.workTime || ""}
    onChange={handleEditChange}
    className="input"
    placeholder="Work Time"
  />

  <input
    name="experience"
    value={editData.experience || ""}
    onChange={handleEditChange}
    className="input"
    placeholder="Experience"
  />

  <select
    name="paymentMode"
    value={editData.paymentMode || ""}
    onChange={handleEditChange}
    className="input"
  >
    <option value="">Payment Mode</option>
    <option value="Cash">Cash</option>
    <option value="UPI">UPI</option>
    <option value="Online">Online</option>
  </select>

  <input
    name="amount"
    type="number"
    value={editData.amount || ""}
    onChange={handleEditChange}
    className="input"
    placeholder="Amount"
  />

  <textarea
    name="description"
    value={editData.description || ""}
    onChange={handleEditChange}
    className="input"
    placeholder="Description"
  />

  <button
    onClick={handleUpdate}
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    Save Changes
  </button>
</>

                  ) : (
                    <>
                      <p><strong>Name:</strong> {job.name}</p>
                      <p><strong>Phone:</strong> {job.phone}</p>
                      <p><strong>Work Time:</strong> {job.workTime}</p>
                      <p><strong>Description:</strong> {job.description}</p>
                      <p><strong>Created:</strong> {new Date(job.createdAt).toLocaleString()}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Myjob;
